/*-- OUT OF GAME FEATURES --*/
window.onload = () => {
    // Rules modal's toggle
    const btnRulesModal = document.querySelector(".rules-btn")
    const rulesModal = document.querySelector(".rules-modal")
    const chooseModal = document.querySelector(".choose-modal")

    let toggle = false

    btnRulesModal.addEventListener("click", () => {
        toggle = !toggle

        if (toggle) {
            rulesModal.style.display = "block"
            rulesModal.style.zIndex = 10;
            setTimeout(() => {
                rulesModal.style.opacity = 1
            }, 10)
            chooseModal.style.display = "none"

        } else if (toggle === false) {
            rulesModal.style.opacity = 0
            rulesModal.style.zIndex = -1;
            setTimeout(() => {
                rulesModal.style.display = "none"
            }, 10)
            chooseModal.style.display = "block"
        }
    })


    // Play music
    const musicPlayer = document.querySelector("audio")
    const playMusicBtn = document.querySelector(".playmusic-btn")

    playMusicBtn.addEventListener("click", handlePlayPause)

    function handlePlayPause() {
        if (musicPlayer.paused) play()
        else pause()
    }

    function play() {
        playMusicBtn.querySelector("img").src = "./images/pausemusic-icon.svg"
        musicPlayer.play()
    }

    function pause() {
        playMusicBtn.querySelector("img").src = "./images/playmusic-icon.svg"
        musicPlayer.pause()
    }




    /*-- GAME FEATURES --*/

    // Variables for the different elements of the game board
    let diceImg = document.querySelector(".dice-img")
    let globalPlayersScores = document.querySelectorAll(".player-global-score")
    let currentPlayersScores = document.querySelectorAll(
        ".player-current-score"
    )


    // Additional variables for algorithms
    let globalScoreP1 = 0
    let globalScoreP2 = 0
    let currentScore = 0
    let actualPlayer = 0
    let player1_Name, player2_Name /* Player name variables come from input names */



    // Play function
    const playGame = () => {
        playersModal()
        initGame()
        playDice()
        holdGame()
        playNewGame()
    }


    // Initialization function
    const initGame = () => {
        globalScoreP1 = 0
        globalScoreP2 = 0
        currentScore = 0
        actualPlayer = 0

        globalPlayersScores.forEach((globalPlayerScore) => {
            globalPlayerScore.textContent = 0
        })
        currentPlayersScores.forEach((currentPlayerScore) => {
            currentPlayerScore.textContent = 0
        })

        switchToPlayer1()

        diceImg.src = "./images/dice-6.png"
    }


    // New Game function
    const newGameModalBtn =
        document.querySelector(".new-game-modal-btn") /* New game button */

    const playNewGame = () => {
        newGameModalBtn.addEventListener("click", () => {
            chooseModal.style.display = "block"
            playersModal()
        })
    }


    // Choose Players Modal function
    const playBtn = document.getElementById("play-btn")
    let namePlayer1 =
        document.getElementById("name-player1") /* Input name 1 */

    let namePlayer2 =
        document.getElementById("name-player2") /* Input name 2 */

    let player1 =
        document.querySelector(".player1-name") /* Name 1 in the game block */
        
    let player2 =
        document.querySelector(".player2-name") /* Name 2 in the game block */

    const playersModal = () => {
        playBtn.addEventListener("click", () => {
            /* Play button, on click */
            if (namePlayer1.value == "") {
                /* If no input entry name of Player 1 */
                player1_Name = "Player 1" /* Keep "Player 1" name */
            } else {
                player1_Name =
                    namePlayer1.value /* Or keep Player 1 name which is written in the input */
            }
            player1.textContent =
                player1_Name /* And add entry name of Player 1 in the game block */
            if (namePlayer2.value == "") {
                /* If no input entry name of Player 2 */
                player2_Name = "Player 2" /* Keep "Player 2" name */
            } else {
                player2_Name =
                    namePlayer2.value /* Or keep Player 2 name which is written in the input */
            }
            player2.textContent =
                player2_Name /* And add entry name of Player 2 in the game block */

                console.log('chooseModal', chooseModal)
            chooseModal.style.display = "none"
            initGame()
        })
    }


    // Roll dice function
    const rollDiceBtn = document.getElementById("roll-dice-btn")
    const soundDice = document.querySelector(".roll-dice-audio")

    const playDice = () => {
        rollDiceBtn.addEventListener("click", () => {
            /* On roll dice click, it triggers dice animation and dice number */
            diceImg.classList.add("animate")
            setTimeout(() => {
                diceImg.classList.remove("animate")
            }, 500)
            let diceValue = Math.floor(Math.random() * 6) + 1
            diceImg.src = `./images/dice-${diceValue}.png`

            if (diceValue === 1) {
                currentScore = 0
                if (actualPlayer == 0) {
                    currentPlayersScores[0].textContent = currentScore /* index 0 on Player 1 position */
                    switchToPlayer2()
                } else {
                    currentPlayersScores[1].textContent = currentScore /* index 1 on Player 2 position */
                    switchToPlayer1()
                }
            } else {
                currentScore += diceValue
                currentPlayersScores[actualPlayer].textContent = currentScore
            }
        })

        rollDiceBtn.onclick = function () {
            /* On roll dice click, it triggers the dice audio song */
            soundDice.play()
            soundDice.volume = 1
        }
    }


    // Hold button function
    const holdDiceBtn = document.getElementById("hold-dice-btn")

    const holdGame = () => {
        holdDiceBtn.addEventListener("click", () => {
            if (actualPlayer == 0) {
                globalScoreP1 += currentScore
                globalPlayersScores[0].textContent = globalScoreP1
                currentScore = 0
                currentPlayersScores[0].textContent = currentScore
                switchToPlayer2()
            } else {
                globalScoreP2 += currentScore
                globalPlayersScores[1].textContent = globalScoreP2
                currentScore = 0
                currentPlayersScores[1].textContent = currentScore
                switchToPlayer1()
            }
            winnerModal()
        })
    }


    // Backgrounds and active icon player when switching players
    const player =
        document.querySelectorAll(".player") /* player's icon, active or not */
    const playerBoard = document.querySelectorAll(".player-board")

    const switchToPlayer1 = () => {
        player[1].classList.add("hidden") /* 2d player with index 2 = Player 2 */
        player[0].classList.remove("hidden") /* 1st player with index 0 = Player 1 */
        playerBoard[0].style.background = "rgb(229 229 229)"
        playerBoard[1].style.background = "rgb(243 244 246)"
        actualPlayer = 0
    }

    const switchToPlayer2 = () => {
        player[0].classList.add("hidden")
        player[1].classList.remove("hidden")
        playerBoard[1].style.backgroundColor = "rgb(229 229 229)"
        playerBoard[0].style.backgroundColor = "rgb(243 244 246)"
        actualPlayer = 1
    }


    // Winner Modal function
    const winModal = document.querySelector(".win-modal")
    let winnerName = document.getElementById("winner-name")
    const closeWinModal = document.querySelector(".close-win-modal")
    const modalNewGameAfterWin = document.getElementById(
        "newGameModal-after-win"
    )


    const winnerModal = () => {
        if (globalScoreP1 >= 100 || globalScoreP2 >= 100) {
            winModal.style.display = "block"
            if (globalScoreP1 >= 100) {
                winnerName.textContent = `Congrats ${player1_Name}`  /* variable injection of Player1_name */
            } else {
                winnerName.textContent = `Congrats ${player2_Name}` /* variable injection of Player2_name */
            }

            closeWinModal.addEventListener("click", () => {
                winModal.style.display = "none"
            })

            modalNewGameAfterWin.addEventListener("click", () => {
                /* New game button in the winner modal, on click */
                winModal.style.display = "none"
                chooseModal.style.display = "block"
                playersModal()
            })
        }
    }

    playGame()
}
