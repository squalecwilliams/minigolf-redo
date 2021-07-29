const username = document.getElementById("username")
const finalScore = document.getElementById("finalScore")

const lastScore = API.getLastScore()

finalScore.innerHTML = lastScore.score

username.addEventListener('keyup', () => {
    console.log(username.value)
    saveScoreBtn.disabled = !username.value
})
