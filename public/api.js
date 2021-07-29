const API = {
    async getLastScore() {
      let res;
      try {
        res = await fetch('/api/allscores');
      } catch (err) {
        console.log(err);
      }
      const json = await res.json();
  
      return json[json.length - 1];
    },
    // async addExercise(data) {
    //   const id = location.search.split('=')[1];
  
    //   const res = await fetch('/api/workouts/' + id, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
  
    //   const json = await res.json();
  
    //   return json;
    // },
    async createScore(data = {}) {
      const res = await fetch('/api/allscores', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const json = await res.json();
  
      return json;
    },
  
    async getAllScores() {
      const res = await fetch(`/api/allscores`);
      const json = await res.json();
  
      return json;
    },
  };