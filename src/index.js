import { isNotDuplicateExist, resetInput } from './modules/input.js';
import { $ } from './modules/util.js';
import { renderResult, renderInit } from './modules/render.js';
import { checkResult } from './modules/result.js';
import NUMBER from './constants/number.js';

export default class BaseballGame {
  constructor() {
    this.computerInput = '';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  init() {
    const $form = $('form');
    $form.addEventListener('submit', this.handleSubmit);
    this.generateComputerInput();
  }

  generateComputerInput() {
    let randomNum = MissionUtils.Random.pickNumberInRange(
      NUMBER.MIN,
      NUMBER.MAX
    ).toString();
    while (randomNum.length !== NUMBER.LENGTH) {
      const newRandomNum = MissionUtils.Random.pickNumberInRange(
        NUMBER.MIN,
        NUMBER.MAX
      ).toString();
      if (isNotDuplicateExist(randomNum + newRandomNum))
        randomNum += newRandomNum;
    }
    this.computerInput = randomNum;
  }

  handleSubmit(event) {
    event.preventDefault();
    const playResult = this.play(this.computerInput, this.getUserInput());
    if (playResult) {
      renderResult(playResult);
      $('#game-restart-button') && this.addEventlistenerToRestartButton();
    }
  }

  play(computerInputNumbers, userInputNumbers) {
    return checkResult(computerInputNumbers, userInputNumbers);
  }

  getUserInput() {
    const $input = $('#user-input');
    return $input.value;
  }

  restartGame() {
    resetInput();
    renderInit();
    this.generateComputerInput();
  }

  addEventlistenerToRestartButton() {
    const $restartButton = $('#game-restart-button');
    $restartButton.addEventListener('click', this.restartGame);
  }
}

const baseBallGame = new BaseballGame();
baseBallGame.init();
