import React from 'react'
import PropTypes from 'prop-types'
import Phaser from "phaser"
import background_game from './assets/IMG/bg.jpg'
import sonic from './assets/IMG/jump.gif'
import building from './assets/IMG/box.jpg'
import './GameView.css'

// Global Parameter
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
let scaler = [0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.5,1.6,1.7]
let height_box = [screen_height / 100 * 15, screen_height / 100 * 20, screen_height / 100 * 25, screen_height / 100 * 30, screen_height / 100 * 35, screen_height / 100 * 40, screen_height / 100 * 45, screen_height / 100 * 50, screen_height / 100 * 55, screen_height / 100 * 60]
let width_box = [screen_width / 100 * 15, screen_width / 100 * 20, screen_width / 100 * 25, screen_width / 100 * 30, screen_width / 100 * 35, screen_width / 100 * 40, screen_width / 100 * 45, screen_width / 100 * 50, screen_width / 100 * 55, screen_width / 100 * 60]
let cooldown_key, loose, exit , destroyed = false
let keyboard, hero
let box = []
let LoadingTime = 6000

class GameView extends React.Component {
  componentDidMount(){
    console.log('GameMount');
    box = []
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    // CONFIGURATION DU JEU
    const config = {
      width: screen_width,
      height: screen_height,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 200}
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    }
    //ELEMENT DU SCREEN DE JEU
    const game = new Phaser.Game(config);
    let GameOverScreen = document.querySelector('.GameOver')


    function preload() {
      console.log('preload');
      this.load.image('sonic', sonic)
      this.load.image('background', background_game)
      this.load.image('box', building)
      this.load.image('floor', building)
    }
    function create() {
      console.log('create');
      setTimeout(()=>{
        exit = false
        destroyed = false
      },LoadingTime)
      let background = this.add.sprite(0,0,'background')//chargment background
      background.setOrigin(0,0)
      background.displayWidth = screen_width
      background.displayHeight = screen_height
      //Création du sol
        let floor = this.physics.add.sprite(-500, screen_height - 10, 'floor')
        floor.body.collideWorldBounds = true
        floor.displayHeight = 5
        floor.displayWidth = 2500

      //Création du hero
        hero = this.physics.add.image(200, 100, 'sonic')// chargement du hero
        hero.body.collideWorldBounds = true
        hero.displayWidth = screen_width / 100 * 6
        hero.displayHeight = screen_height / 100 * 8

      //Création des box

        let nb = 200
        //Génération des boxs
        for (var i = 0; i < 4; i++) {
          let varPush = this.physics.add.sprite(nb, 600, 'box')
          box.push(varPush)
          nb += 1500
        }
        // Initialisation de la taille des boites
        for (var i = 0; i < box.length; i++) {
          box[i].displayWidth = width_box[getRandomInt(width_box.length)]
          box[i].displayHeight = height_box[getRandomInt(height_box.length)]
          box[i].y = screen_height - 5 - (box[i].displayHeight / 2)
          box[i].body.immovable = true
          box[i].body.allowGravity = false;

        }

      //lOGIQUE DES COLLISION
      this.physics.add.collider(box, floor)
      this.physics.add.collider(hero, box)
    //   this.physics.add.overlap(hero, box, function (e) {
    //   console.log(e.body.checkCollision.up);
    // });

      //LISTENER KEYBOARD
      keyboard = this.input.keyboard.createCursorKeys()// chargement des event key
    }
    function update() {
      console.log('update');
      setTimeout(()=>{
        if (!exit) {
          // Fonctionnement des boxs
          for (var i = 0; i < box.length; i++) {
            box[i].setVelocity(-300, 0)
            if (box[i].x < -200) {
              box[i].x = screen_width + 500
              box[i].displayWidth = width_box[getRandomInt(width_box.length)]
              box[i].displayHeight = height_box[getRandomInt(height_box.length)]
              box[i].y = screen_height - 5 - (box[i].displayHeight / 2)
            }
          }
          // Fonctionnement du Hero
          // hero.setVelocity(-50, 0)
          if (keyboard.space.isDown) {
            if (!cooldown_key) {
              cooldown_key = true
              hero.setVelocity(150, -300)
              // setTimeout(()=>{
              //   hero.setVelocity(100, 0)
              //   cooldown_key = false
              // }, 2000)
            }
          }
          if (hero.body.touching.down) {
            cooldown_key = false
          }

          // Parametre GAME OVER
          if(hero.x < 77 || hero.y < 97){
            if (!loose) {
              loose = true
            }
          }
        }
        if (loose) {
          exit = true
          if (!destroyed) {
            destroyed = true
            loose = false
            this.sys.game.destroy(true)
          }
          // this.sys.game.destroy(true)
          GameOverScreen.classList.remove('dis-none')

        }

      },LoadingTime)
    }
  }
  componentWillUnmount(){
    console.log('GameUnMount');
  }
  render () {
    return(
      <div className="GameView">
        <div className="GameOver dis-none">
          <h1>Game Over</h1>
          <p onClick={this.props.run}>Retour</p>
        </div>
      </div>
    )
  }
}

export default GameView;
