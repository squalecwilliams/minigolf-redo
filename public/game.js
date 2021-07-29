
var strokeCount = 0;
var holeNum = 1;
const MAX_HOLES = 9;







function run(){


    // module aliases
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Common = Matter.Common,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      MouseConstraint = Matter.MouseConstraint,
      Constraint = Matter.Constraint,
      Query = Matter.Query,
      Vertices = Matter.Vertices,
      Events = Matter.Events,
      Mouse = Matter.Mouse;
    
    // create an engine
    var engine = Engine.create();
    
    var width_ = 800;
    var height_ = 600;
    
    var colorA = '#fff000',
        colorB = '#00afff',
        loseC = '#ff0000',
        winC = '#00ff00',
        ground = '#008800',
        lava = '#ff5a00';

        var def = 0x0001,
            cat = 0x0002;
    
    
    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
          width: width_,
          height: height_,
          showVelocity: false,
          wireframes: false,
          showAngleIndicator: false,
          showCollisions: false
        }
    });
    
    
    
    // create two boxes and a ground and a ceiling----------------
    var boxR = Bodies.rectangle(width_, height_ / 2, 40, height_, {
        isStatic: true,
        friction: 0.1,
        restitution: 1,
        collisionFilter: {
            mask: def || cat
        }
    });
    var boxL = Bodies.rectangle(0, height_ / 2, 40, height_, {
        isStatic: true,
        friction: 0.1,
        restitution: 1,
        collisionFilter: {
            mask: def || cat
        }
    });
    var ground = Bodies.rectangle(width_ / 2, height_, width_, 100, {
        isStatic: true,
        angle: 0,
        friction: 0.1,
        restitution: 1,
        collisionFilter: {
            mask: def || cat
        },
        render: {
            fillStyle: ground
        }
        });
    var ceiling = Bodies.rectangle(width_ / 2, 0, width_, 40, {
        isStatic: true,
        angle: 0,
        friction: 0.1,
        restitution: 1,
        collisionFilter: {
            mask: def || cat
        }
        });
    
    
    var circle = Bodies.circle(100, height_ - 100, 20, {
        isStatic: false,
        restitution: .75,
        friction: 0.02,
        frictionAir: 0,
        density: 0.01,
        collisionFilter: {
            mask: def || cat
        },
        render: {
            fillStyle: colorB
        }
    });
    World.add(engine.world, circle);
    
    
    //add boxes
    var Boxes = [];
    var numBoxes = Math.floor((Math.random() + .5) * 5);
    
    var randX = 0, randXSize = 0;
    
    for(var i = 0; i < numBoxes; i++){
        var randY = getRandomInt(height_)
        var calcY = calcHeight(randY);
        randomX()
        Boxes.push(
            Bodies.rectangle(randX, randY - 50 + calcY / 2, randXSize, calcY, {
              isStatic: true,
              restitution: 0.7,
              friction: 0.02,
              frictionAir: 0,
              density: 0.01,
              collisionFilter: {
                mask: def || cat
            },
              render: {
                fillStyle: '#ffffff',
                strokeStyle: '#000000',
                lineWidth: 2
                }
            })
          );
        World.add(engine.world, Boxes[i]);
    }
    
    function calcHeight(pos){
        return ground.position.y - pos
    }
    
    function getRandomInt(max) {
        let min = Math.ceil(150);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    
    var hole = Bodies.rectangle(700, height_ - 55, 50, 10, {
        isStatic: true,
        isSensor: true,  
        render: {
            strokeStyle: '#ffffff',
            fillStyle: colorA,
            lineWidth: 1
        }
    });
    randomX()
    var lava = Bodies.rectangle(randX + 25, height_ - 55, randXSize - 25, 10, {
        isStatic: true,
        isSensor: true,  
        render: {
            strokeStyle: '#ffffff',
            fillStyle: lava,
            lineWidth: 1
        }
    });
    
    function randomX(){
        randX = getRandomInt(width_ - 125)
        randXSize = getRandomInt(width_ / 8)
        if(randX + (randXSize / 2) > 650){
            randX = randX - (randX + (randXSize / 2) - 650)
        }
    }
    
    World.add(engine.world, [hole, lava]);
    
    Events.on(engine, 'collisionStart', function(event) {
        

        
        var pairs = event.pairs;
        
        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
    
            if (pair.bodyA === hole) {
                pair.bodyB.render.fillStyle = winC;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
                setTimeout(function(){
                    holeNum++
                    document.getElementById('hole-number').innerHTML = getHole();
                    World.remove(engine.world, circle);
                    document.removeEventListener("mousedown", mouseD)
                    render.canvas.remove();
                    render.canvas = null;
                    render.context = null;
                    render.textures = {};
                    Render.stop(render)
                    World.clear(engine.world)
                    Engine.clear(engine)
                    if(holeNum > MAX_HOLES){
                        //finalScore.innerHTML = strokeCount;
                        return window.location.assign("end.html")
                    }
                    run()
                }, 1000)
            } else if (pair.bodyB === hole) {
                pair.bodyA.render.fillStyle = winC;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
                setTimeout(function(){
                    holeNum++
                    document.getElementById('hole-number').innerHTML = getHole();
                    World.remove(engine.world, circle);
                    document.removeEventListener("mousedown", mouseD)
                    render.canvas.remove();
                    render.canvas = null;
                    render.context = null;
                    render.textures = {};
                    Render.stop(render)
                    World.clear(engine.world)
                    Engine.clear(engine)
                    if(holeNum > MAX_HOLES){
                        //localStorage.setItem('mostRecentScore', strokeCount)
                        return window.location.assign("end.html")
                    }
                    run()
                }, 1000)
            }
    
            if (pair.bodyA === lava) {
                pair.bodyB.render.fillStyle = loseC;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
                Matter.Body.setPosition(circle, {x: 100, y: height_ - 100})
            } else if (pair.bodyB === lava) {
                pair.bodyA.render.fillStyle = loseC;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
                Body.setPosition(circle, {x: 100, y: height_ - 100})
            }
        }
    });
    
    Events.on(engine, 'collisionEnd', function(event) {
        var pairs = event.pairs;
        
        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
    
            if (pair.bodyA === hole) {
                pair.bodyB.render.fillStyle = colorB;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
            } else if (pair.bodyB === hole) {
                pair.bodyA.render.fillStyle = colorB;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
            }
    
            if (pair.bodyA === lava) {
                pair.bodyB.render.fillStyle = colorB;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
            } else if (pair.bodyB === lava) {
                pair.bodyA.render.fillStyle = colorB;
                Body.setVelocity(circle, {x: 0, y: 0})
                Body.setAngularVelocity(circle, 0)
            }
        }
    });
    
    
    Events.on(render, 'afterRender', function() {
        
    
    
        var mouse = mouseConstraint.mouse,
            context1 = render.context,
            //context2 = render.context,
            bodies = Composite.allBodies(engine.world),
            startPoint1 = { x: circle.position.x, y: circle.position.y },
            //startPoint2 = { x: box.position.x, y: box.position.y },
            endPoint = mouse.position;
    
        
    
        createRay(mouse, context1, startPoint1, endPoint, bodies)
        //createRay(mouse, context2, startPoint2, endPoint, bodies)
    
    });
    
    function createRay(mouse, context, startPoint, endPoint, bodies){
        var collisions = Query.ray(bodies, startPoint, endPoint);
        
        Render.startViewTransform(render);
    
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        if (collisions.length > 0) {
            context.strokeStyle = '#fff';
        } else {
            context.strokeStyle = '#555';
        }
        context.lineWidth = 0.5;
        context.stroke();
    
        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            context.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
        }
    
        context.fillStyle = 'rgba(255,165,0,0.7)';
        context.fill();
    
        Render.endViewTransform(render);
    }
    
        
    
    
    function calcVelo(end, start){
        
        return { x: -1 * (end.x - start.x) / 7500, y: -1 * (end.y - start.y) / 5000 };
    }
    
    // const keyHandlers = {
    //     KeyD: () => {
    //       Matter.Body.applyForce(boxA, {
    //         x: boxA.position.x,
    //         y: boxA.position.y
    //       }, {x: 0.02, y: 0})
    //     },
    //     KeyA: () => {
    //       Matter.Body.applyForce(boxA, {
    //         x: boxA.position.x,
    //         y: boxA.position.y
    //       }, {x: -0.02, y: 0})
    //     },
    //   };
    
    
    // const keysDown = new Set();
    // document.addEventListener("keydown", event => {

    //     keysDown.add(event.code)
    //     setTimeout( function(){
    //         console.log('Function Fired')
    //         keysDown.delete(event.code)
    //     }, 100)
    // })

    // Matter.Events.on(engine, "beforeUpdate", event => {
    //     [...keysDown].forEach(k => {
    //       keyHandlers[k]?.();
    //     });
    //   });

    document.addEventListener("mousedown", mouseD);
    
    function mouseD(){
        let count = 0
        requestAnimationFrame(function animationFrameHandler(){
            count++
            if(count < 12){
              Body.applyForce( circle, {x: circle.position.x, y: circle.position.y}, calcVelo(circle.position, mouse.position));
              requestAnimationFrame(animationFrameHandler)
          }
        })
        strokeCount++;
        document.getElementById('stroke-count').innerHTML = getStroke();
    

    }
    
    

    function getStroke(){
        return `
            <h1>Strokes: ${strokeCount}</h1>
        `
    }

    function getHole(){
        return `
            <h1>Hole: ${holeNum}</h1>
        `
    }

    
    
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
            }
    });
    
    function createFrictions(){
        engine.world.gravity.y = 1;
        var randAirF = Math.random() / parseFloat(getRandomInt(50))
        engine.world.frictionAir = randAirF
        console.log("Air Friction", randAirF)
        
        var randF = Math.random() / parseFloat(getRandomInt(50))
        engine.world.friction = randF
        console.log("Block Friction", randF)
    }
    
    
    World.add(engine.world, [ground, ceiling, boxR, boxL]);
    
    World.add(engine.world, mouseConstraint);
    
    createFrictions();
    
    
    
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    mouseConstraint.collisionFilter.mask = cat;
    // run the engine
    Engine.run(engine);
    
    // run the renderer
    Render.run(render);
    
    // runner
    let runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    engine.constraintIterations = 20;
    document.getElementById('stroke-count').innerHTML = getStroke();
    document.getElementById('hole-number').innerHTML = getHole();

}


run();


