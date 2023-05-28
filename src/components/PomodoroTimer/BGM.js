// 対象mp3をimportしてAudioオブジェクトに指定する
import workBGM from "@/assets/work-bgm.mp3";
import restBGM from "@/assets/rest-bgm.mp3";

export const mp3 = {
  workBGM: workBGM,
  restBGM: restBGM
}

export const BGM = new Audio();
BGM.loop = true;
BGM.volume = 0.5;
