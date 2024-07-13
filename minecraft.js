window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 1000;
  const height = 900;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x00eeff);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 40, -520);
  //camera.position.set(0, 40, -150);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
  });
  const eyeMat1 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const eyeMat2 = new THREE.MeshStandardMaterial({
    color: 0xff5fdf,
  });
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
  });
  const tutiMat = new THREE.MeshStandardMaterial({
    color: 0x734e30,
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
  });

  const head = new THREE.Mesh(new THREE.BoxGeometry(14, 14, 14), bodyMat);

  const eyeR1 = new THREE.Mesh(new THREE.BoxGeometry(5.3, 1.7, 1.7), eyeMat1);
  const eyeR2 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1), eyeMat2);
  eyeR2.position.set(0, 0, -0.4);

  const eyeL1 = new THREE.Mesh(new THREE.BoxGeometry(5.3, 1.7, 1.7), eyeMat1);
  const eyeL2 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1), eyeMat2);
  eyeL2.position.set(0, 0, -0.4);

  const eyeR = new THREE.Group();
  eyeR.add(eyeR1, eyeR2);
  eyeR.position.set(4.3, -2, -6.3);

  const eyeL = new THREE.Group();
  eyeL.add(eyeL1, eyeL2);
  eyeL.position.set(-4.3, -2, -6.3);

  const face = new THREE.Group();
  face.add(head, eyeR, eyeL);
  face.position.set(0, -1, 0);
  //scene.add(face);

  const chest1 = new THREE.Mesh(new THREE.BoxGeometry(12, 16, 12), bodyMat);
  const chest2 = new THREE.Mesh(new THREE.BoxGeometry(12, 16, 12), bodyMat);
  chest1.position.set(0, -8, 0);
  chest2.position.set(0, 8, 0);
  chest2.visible = false;
  const chest = new THREE.Group();
  chest.add(chest1, chest2);
  chest.position.set(0, 8, 0);

  const armR1 = new THREE.Mesh(new THREE.BoxGeometry(4, 36, 4), bodyMat);
  const armR2 = new THREE.Mesh(new THREE.BoxGeometry(4, 36, 4), eyeMat1);
  armR1.position.set(0, -18, 0);
  armR2.position.set(0, 18, 0);
  armR2.visible = false;
  const armR = new THREE.Group();
  armR.add(armR1, armR2);
  //scene.add(armR);

  const armL1 = new THREE.Mesh(new THREE.BoxGeometry(4, 36, 4), bodyMat);
  const armL2 = new THREE.Mesh(new THREE.BoxGeometry(4, 36, 4), eyeMat1);
  armL1.position.set(0, -18, 0);
  armL2.position.set(0, 18, 0);
  armL2.visible = false;
  const armL = new THREE.Group();
  armL.add(armL1, armL2);

  armR.position.set(8, 0, 0);
  armL.position.set(-8, 0, 0);

  const arms = new THREE.Group();
  arms.add(armR, armL);
  arms.position.set(0, 8, 0);

  const legR1 = new THREE.Mesh(new THREE.BoxGeometry(3, 36, 4), bodyMat);
  const legR2 = new THREE.Mesh(new THREE.BoxGeometry(3, 36, 4), eyeMat1);
  legR1.position.set(0, -18, 0);
  legR2.position.set(0, 18, 0);
  legR2.visible = false;
  const legR = new THREE.Group();
  legR.add(legR1, legR2);
  //scene.add(legR);

  const legL1 = new THREE.Mesh(new THREE.BoxGeometry(3, 36, 4), bodyMat);
  const legL2 = new THREE.Mesh(new THREE.BoxGeometry(3, 36, 4), eyeMat1);
  legL1.position.set(0, -18, 0);
  legL2.position.set(0, 18, 0);
  legL2.visible = false;
  const legL = new THREE.Group();
  legL.add(legL1, legL2);

  legR.position.set(2.1, -8, 0);
  legL.position.set(-2.1, -8, 0);

  const legs = new THREE.Group();
  legs.add(legR, legL);

  const body = new THREE.Group();
  body.add(chest, arms, legs);
  //scene.add(body);

  body.position.set(0, -16, 0);

  const man = new THREE.Group();
  man.add(face, body);
  man.position.set(0, 65, 0);
  //scene.add(man);

  // const tutiB = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), tutiMat);

  // const tuti = new THREE.Mesh(new THREE.BoxGeometry(12, 10, 12), tutiMat);
  // const kusa = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 12), groundMat);
  // tuti.position.set(0, -1, 0);
  // kusa.position.set(0, 5, 0);
  // const kusaB = new THREE.Group();
  // kusaB.add(tuti, kusa);

  // const stoneB = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), stoneMat);

  // tutiB.position.set(12, 0, 0);
  // stoneB.position.set(-12, 0, 0);
  //scene.add(kusaB);
  //scene.add(tutiB, kusaB, stoneB);

  const cubes = []; // キューブを格納する配列

  // キューブのサイズ
  const cubeSize = 12;
  const gridSize = 30;
  let cube;

  // キューブを20x20のグリッドに配置
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < 3; k++) {
        if (k == 1) {
          cube = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
            tutiMat
          );
        } else if (k == 2) {
          cube = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
            stoneMat
          );
        } else {
          const kusa = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, 2, cubeSize),
            groundMat
          );
          const tuti = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, 10, cubeSize),
            tutiMat
          );
          kusa.position.set(0, 5, 0);
          tuti.position.set(0, -1, 0);
          cube = new THREE.Group();
          cube.add(kusa, tuti);
        }

        // キューブの位置を設定
        cube.position.set(
          i * cubeSize - (gridSize / 2) * cubeSize,
          -k * cubeSize,
          j * cubeSize - (gridSize / 2) * cubeSize
        );

        // シーンにキューブを追加
        scene.add(cube);

        // 配列にキューブを追加
        cubes.push(cube);
      }
    }
  }

  const tutiB_have = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), tutiMat);
  tutiB_have.rotation.set(Math.PI / 6, 0, 0);
  tutiB_have.position.set(0, 25, -21);
  //scene.add(tutiB_have);

  const tuti_have = new THREE.Mesh(new THREE.BoxGeometry(12, 10, 12), tutiMat);
  const kusa_have = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 12), groundMat);
  tuti_have.position.set(0, -1, 0);
  kusa_have.position.set(0, 5, 0);
  const kusaB_have = new THREE.Group();
  kusaB_have.add(tuti_have, kusa_have);
  kusaB_have.rotation.set(Math.PI / 6, 0, 0);
  kusaB_have.position.set(0, 25, -21);
  //scene.add(kusaB_have);

  const stoneB_have = new THREE.Mesh(
    new THREE.BoxGeometry(12, 12, 12),
    stoneMat
  );
  stoneB_have.rotation.set(Math.PI / 6, 0, 0);
  stoneB_have.position.set(0, 25, -21);

  tutiB_have.visible = false;
  stoneB_have.visible = false;
  kusaB_have.visible = false;

  const have_blocks = new THREE.Group();
  have_blocks.add(tutiB_have, kusaB_have, stoneB_have);

  const player = new THREE.Group();
  player.add(man, have_blocks);
  scene.add(player);

  // キーボードの状態をトラッキングする変数
  const keys = {
    a: false, //左
    s: false, //後退
    d: false, //右
    w: false, //前進
    p: false, //ブロック削除
    o: false, //ブロック追加
    x: false,
    y: false,
    z: false,
    Shift: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  // キーが押されたときの処理
  document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
  });

  // キーが離されたときの処理
  document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
  });

  //方向
  let flag_left = false;
  let flag_right = false;
  let flag_forward = true;
  let flag_back = false;

  //アクション
  let flag_jump = false;
  let flag_atack = false;
  let flag_hold = false;
  let flag_sneak = false;
  let flag_tele = false;
  let flag_camera1 = false;
  let camera_move = false;
  let flag_camera2 = false;

  //テレポート関連
  let tele_x = 0;
  let tele_z = 0;
  let teleSpeed = 20;
  let tele_dx = 0;
  let tele_dz = 0;

  //カメラ関連
  let camera_y = 65;
  let camera_updown = -0.1;
  let camera_leftright = 0;

  function flagClear() {
    flag_left = false;
    flag_right = false;
    flag_forward = false;
    flag_back = false;
  }

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event_k) {
    let keyCode = event_k.which;
    if (!flag_camera1) {
      // a
      if (keys.a) {
        flagClear();
        flag_left = true;
      }
      //d
      if (keys.d) {
        flagClear();
        flag_right = true;
      }
      //w
      if (keys.w) {
        flagClear();
        flag_back = true;
      }
      //s
      if (keys.s) {
        flagClear();
        flag_forward = true;
      }
    }

    if (keys.p) {
      removeCubeUnderPlayer();
    }

    if (keys.o) {
      addCube();
    }

    //space
    if (keyCode == 32 && !flag_jump) {
      flag_jump = true;
    }
    //enter
    if (keyCode == 13 && !flag_atack && !flag_hold) {
      flag_atack = true;
    }
    //backspace
    if (keyCode == 8) {
      block = 0;
      hold(block);
      flag_hold = false;
    }
    // Shift
    if (keyCode == 16) {
      flag_sneak = !flag_sneak;
      if (flag_sneak) {
        speed_walk = 0.3;
        speed_leg = 0.005;
        chest.rotation.x -= Math.PI / 6;
        face.position.y -= 5;
        chest.position.y -= 5;
        arms.position.y -= 7;
        face.position.z -= 7;
        chest.position.z -= 7;
        arms.position.z -= 7;
        have_blocks.position.y -= 7;
        have_blocks.position.z -= 7;
      } else {
        chest.rotation.x += Math.PI / 6;
        face.position.y += 5;
        chest.position.y += 5;
        arms.position.y += 7;
        face.position.z += 7;
        chest.position.z += 7;
        arms.position.z += 7;
        have_blocks.position.y += 7;
        have_blocks.position.z += 7;
        speed_walk = 1.5;
        speed_leg = 0.03;
      }
    }
    //r
    if (keyCode == 82 && !flag_tele) {
      tele_x = teleSpeed * getRandomInt(-10, 10);
      tele_z = teleSpeed * getRandomInt(-10, 10);
      flag_tele = true;
      if (tele_x < player.position.x) tele_dx = -1;
      else tele_dx = 1;
      if (tele_z < player.position.z) tele_dz = -1;
      else tele_dz = 1;
    }
    //1
    if (keyCode == 49) {
      flag_camera1 = !flag_camera1;
      camera_move = false;
      if (!flag_camera1) {
        flag_camera2 = false;
        camera_leftright = 0;
        camera_updown = -0.1;
        camera.position.set(0, 40, -520);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      }
    }
    //2
    if (keyCode == 50) {
      camera.position.set(0, player.position.y + 40, player.position.z - 520);
      camera.lookAt(player.position);
      camera_move = true;
      if (!flag_camera2) {
        flag_camera1 = false;
        camera_move = false;
        camera.position.set(0, 40, -520);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      }
    }
  }

  let count_rotation = 0;
  let player_up = 0;
  let count_atack = 0;
  let speed_walk = 1.5;
  let speed_leg = 0.03;
  let velocity = 0; // プレイヤーの速度
  const gravity = -0.2; // 重力
  const v = 3.5; // ジャンプの初速度
  let isOnCube = false;

  let preCamera = 0;
  let lastCamera_x = 0;
  let lastCamera_y = 0;
  let lastCamera_z = 0;

  // アニメーションループ
  function animate() {
    // プレイヤーがキューブの上にいるかどうかをチェック
    isOnCube = false;
    for (let cube of cubes) {
      if (
        player.position.x >= cube.position.x - cubeSize / 2 &&
        player.position.x <= cube.position.x + cubeSize / 2 &&
        player.position.z >= cube.position.z - cubeSize / 2 &&
        player.position.z <= cube.position.z + cubeSize / 2 &&
        player.position.y >= cube.position.y - cubeSize / 2 &&
        player.position.y <= cube.position.y + cubeSize / 2
      ) {
        isOnCube = true;
        break;
      }
    }

    if (!flag_camera1 && !flag_tele) {
      if (keys.a) {
        player.rotation.set(0, -Math.PI / 2, 0);
        //camera.position.x += 1;
        player.position.x += speed_walk;
        //movePlayer(speed_walk,0,0);
        if (camera_move) camera.position.x += speed_walk;
      }

      if (keys.d) {
        player.rotation.set(0, Math.PI / 2, 0);
        player.position.x -= speed_walk;
        //movePlayer(-speed_walk,0,0);
        if (camera_move) camera.position.x -= speed_walk;
      }

      if (keys.w) {
        player.rotation.set(0, Math.PI, 0);
        player.position.z += speed_walk;
        //movePlayer(0,0,speed_walk);
        if (camera_move) camera.position.z += speed_walk;
      }

      if (keys.s) {
        player.rotation.set(0, 0, 0);
        player.position.z -= speed_walk;
        //movePlayer(0,0,-speed_walk);
        if (camera_move) camera.position.z -= speed_walk;
      }

      //斜め歩き
      if (keys.a && keys.s) {
        player.rotation.set(0, -Math.PI / 4, 0);
      }
      if (keys.d && keys.s) {
        player.rotation.set(0, Math.PI / 4, 0);
      }
      if (keys.a && keys.w) {
        player.rotation.set(0, (-3 * Math.PI) / 4, 0);
      }
      if (keys.d && keys.w) {
        player.rotation.set(0, (3 * Math.PI) / 4, 0);
      }
    }

    //カメラ
    //camera
    if (flag_camera1) {
      camera.position.copy(player.position);
      camera.position.y += 65;
      camera.position.x += 10 * Math.sin(camera_leftright);
      camera.position.z -= 10 * Math.cos(camera_leftright);
      player.rotation.set(0, -camera_leftright, 0);
      //カメラ縦移動
      lastCamera_y = camera_y * Math.sin(camera_updown);
      preCamera = camera_y * Math.cos(camera_updown);

      //カメラ横移動
      lastCamera_x = preCamera * Math.sin(camera_leftright);
      lastCamera_z = -preCamera * Math.cos(camera_leftright);

      if(flag_sneak){
        camera.position.y -= 5;
        camera.position.z -= 7;
      }

      camera.lookAt(
        new THREE.Vector3(
          lastCamera_x + player.position.x,
          lastCamera_y + player.position.y + 65,
          lastCamera_z + player.position.z
        )
      );
      //方向によって進み方変える
      if (!flag_tele) {
        if (flag_forward) {
          if (keys.a) {
            player.position.x -= speed_walk;
          }
          if (keys.d) {
            player.position.x += speed_walk;
          }
          if (keys.w) {
            player.position.z -= speed_walk;
          }
          if (keys.s) {
            player.position.z += speed_walk;
          }
        }
        if (flag_back) {
          if (keys.a) {
            player.position.x += speed_walk;
          }
          if (keys.d) {
            player.position.x -= speed_walk;
          }
          if (keys.w) {
            player.position.z += speed_walk;
          }
          if (keys.s) {
            player.position.z -= speed_walk;
          }
        }
        if (flag_left) {
          if (keys.a) {
            player.position.z -= speed_walk;
          }
          if (keys.d) {
            player.position.z += speed_walk;
          }
          if (keys.w) {
            player.position.x += speed_walk;
          }
          if (keys.s) {
            player.position.x -= speed_walk;
          }
        }
        if (flag_right) {
          if (keys.a) {
            player.position.z += speed_walk;
          }
          if (keys.d) {
            player.position.z -= speed_walk;
          }
          if (keys.w) {
            player.position.x -= speed_walk;
          }
          if (keys.s) {
            player.position.x += speed_walk;
          }
        }
      }

      //今向いている方向
      if (
        camera_leftright < Math.PI / 4 ||
        camera_leftright > (7 * Math.PI) / 4
      ) {
        flagClear();
        flag_forward = true;
      }
      if (
        camera_leftright > (3 * Math.PI) / 4 &&
        camera_leftright < (5 * Math.PI) / 4
      ) {
        flagClear();
        flag_back = true;
      }
      if (
        camera_leftright > Math.PI / 4 &&
        camera_leftright < (3 * Math.PI) / 4
      ) {
        flagClear();
        flag_left = true;
      }
      if (
        camera_leftright > (5 * Math.PI) / 4 &&
        camera_leftright < (7 * Math.PI) / 4
      ) {
        flagClear();
        flag_right = true;
      }

      if (flag_sneak) {
        camera.position.y -= 5;
      }
    }

    //足閉じる
    if (!keys.a && !keys.s && !keys.w && !keys.d) {
      if (isOnCube) {
        legR.rotation.set(0, 0, 0);
        legL.rotation.set(0, 0, 0);
        count_rotation = 0;
      }
    } else {
      if (count_rotation < Math.PI / 10) {
        legL.rotation.x += speed_leg;
        legR.rotation.x -= speed_leg;
        count_rotation += speed_leg;
      } else if (count_rotation < (3 * Math.PI) / 10) {
        legL.rotation.x -= speed_leg;
        legR.rotation.x += speed_leg;
        count_rotation += speed_leg;
      } else if (count_rotation < (2 * Math.PI) / 5) {
        legL.rotation.x += speed_leg;
        legR.rotation.x -= speed_leg;
        count_rotation += speed_leg;
      } else {
        count_rotation = 0;
      }
    }

    if (flag_camera1) {
      // ArrowUp キーが押されたとき
      if (keys.ArrowUp) {
        if (camera_updown < (2 * Math.PI) / 6) camera_updown += 0.01;
        console.log(camera_updown);
        //camera_y *= Math.cos(camera_updown);
      }

      // ArrowDown キーが押されたとき
      if (keys.ArrowDown) {
        if (camera_updown > (-2 * Math.PI) / 6) camera_updown -= 0.01;
        console.log(camera_updown);
        //camera_y *= Math.cos(camera_updown);
      }

      // ArrowLeft キーが押されたとき
      if (keys.ArrowLeft) {
        camera_leftright -= 0.01;
        if (camera_leftright < 0) camera_leftright += 2 * Math.PI;
        // console.log(camera_leftright);
      }

      // ArrowRight キーが押されたとき
      if (keys.ArrowRight) {
        camera_leftright += 0.01;
        if (camera_leftright > 2 * Math.PI) camera_leftright -= 2 * Math.PI;
        // console.log(camera_leftright);
      }
    }

    //jump
    if (flag_jump) {
      if (player_up === 0) {
        // ジャンプ開始
        velocity = v;
        player_up = 1;
      } else {
        // 重力を適用
        velocity += gravity;
        // プレイヤーの位置を更新
        player.position.y += velocity;
        // 地面に接触した場合
        if (velocity <= 0 && isOnCube) {
          player_up = 0;
          flag_jump = false;
          velocity = 0;
        }
      }
    }

    //atack
    if (flag_atack) {
      if (count_atack < Math.PI / 2) {
        arms.rotation.x += 0.05;
        count_atack += 0.05;
      } else if (count_atack < Math.PI) {
        arms.rotation.x -= 0.02;
        count_atack += 0.02;
      } else {
        arms.rotation.set(0, 0, 0);
        count_atack = 0;
        flag_atack = false;
      }
    }

    //teleport
    if (flag_tele) {
      if (tele_dx == 1) {
        if (player.position.x < tele_x) {
          player.position.x += teleSpeed;
        } else {
          player.position.x = tele_x;
        }
      } else if (tele_dx == -1) {
        if (player.position.x > tele_x) {
          player.position.x -= teleSpeed;
        } else {
          player.position.x = tele_x;
        }
      }

      if (tele_dz == 1) {
        if (player.position.z < tele_z) {
          player.position.z += teleSpeed;
        } else {
          player.position.z = tele_z;
        }
      } else if (tele_dz == -1) {
        if (player.position.z > tele_z) {
          player.position.z -= teleSpeed;
        } else {
          player.position.z = tele_z;
        }
      }
      if (player.position.x == tele_x && player.position.z == tele_z) {
        flag_tele = false;
      }
    }

    // プレイヤーがキューブの上にいない場合、重力を適用
    if (!isOnCube && !flag_jump) {
      velocity += gravity;
      player.position.y += velocity;
    }

    // プレイヤーのy座標が-100以下になった場合、初期位置に戻す
    if (player.position.y < -100) {
      player.position.set(0, 0, 0);
      player.rotation.set(0, 0, 0);
      flagClear();
      flag_forward = true;
      camera_leftright = 0;
      camera_updown = -0.1;
      velocity = 0;
      flag_tele = false;
      flag_sneak = false;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 1);
  // シーンに追加
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // render
  function render() {
    renderer.render(scene, camera);
  }
  render();

  //ボタン処理
  let block = 0;

  const buttonActions = {
    tuti: 1,
    stone: 2,
    kusa: 3,
    no: 0,
  };

  for (let buttonId in buttonActions) {
    document.getElementById(buttonId).addEventListener("click", function () {
      if (!flag_atack || buttonId != "no") {
        block = buttonActions[buttonId];
        hold(block);
        if (buttonId === "no") {
          flag_hold = false;
        }
      }
    });
  }

  function hold(block) {
    flag_hold = true;
    switch (block) {
      case 0:
        armR.rotation.set(0, 0, 0);
        armL.rotation.set(0, 0, 0);
        tutiB_have.visible = false;
        stoneB_have.visible = false;
        kusaB_have.visible = false;
        break;

      case 1:
        armR.rotation.set(Math.PI / 6, 0, 0);
        armL.rotation.set(Math.PI / 6, 0, 0);
        tutiB_have.visible = true;
        stoneB_have.visible = false;
        kusaB_have.visible = false;
        break;
      case 2:
        armR.rotation.set(Math.PI / 6, 0, 0);
        armL.rotation.set(Math.PI / 6, 0, 0);
        tutiB_have.visible = false;
        stoneB_have.visible = true;
        kusaB_have.visible = false;
        break;
      case 3:
        armR.rotation.set(Math.PI / 6, 0, 0);
        armL.rotation.set(Math.PI / 6, 0, 0);
        tutiB_have.visible = false;
        stoneB_have.visible = false;
        kusaB_have.visible = true;
        break;
    }
  }

  function removeCubeUnderPlayer() {
    // プレイヤーの現在の位置を取得
    let position = player.position.clone();
    //ばしょをずらす
    if (!flag_sneak) position.y += cubeSize;
    if (flag_forward) position.z -= cubeSize;
    if (flag_back) position.z += cubeSize;
    if (flag_left) position.x += cubeSize;
    if (flag_right) position.x -= cubeSize;
    // キューブを見つける
    // その位置にあるキューブを探す
    for (let i = 0; i < cubes.length; i++) {
      if (
        position.x >= cubes[i].position.x - cubeSize / 2 &&
        position.x <= cubes[i].position.x + cubeSize / 2 &&
        position.y >= cubes[i].position.y - cubeSize / 2 &&
        position.y <= cubes[i].position.y + cubeSize / 2 &&
        position.z >= cubes[i].position.z - cubeSize / 2 &&
        position.z <= cubes[i].position.z + cubeSize / 2
      ) {
        // キューブをシーンから削除
        scene.remove(cubes[i]);
        // キューブを配列から削除
        cubes.splice(i, 1);
        break;
      }
    }
  }

  function addCube() {
    // プレイヤーの足元のキューブを見つける
    let cubeadd = null;
    for (let cube of cubes) {
      if (
        player.position.x > cube.position.x - cubeSize / 2 &&
        player.position.x < cube.position.x + cubeSize / 2 &&
        player.position.z > cube.position.z - cubeSize / 2 &&
        player.position.z < cube.position.z + cubeSize / 2 &&
        player.position.y - cubeSize / 2 <= cube.position.y
      ) {
        cubeadd = cube;
        break;
      }
    }

    // 新しいキューブを作成
    if (block == 0) return;
    else if (block == 1) {
      cube = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        tutiMat
      );
    } else if (block == 2) {
      cube = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        stoneMat
      );
    } else if (block == 3) {
      const kusa = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, 2, cubeSize),
        groundMat
      );
      const tuti = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, 10, cubeSize),
        tutiMat
      );
      kusa.position.set(0, 5, 0);
      tuti.position.set(0, -1, 0);
      cube = new THREE.Group();
      cube.add(kusa, tuti);
    }

    // キューブをプレイヤーの目の前の位置に設定
    cube.position.copy(cubeadd.position);
    if (!flag_sneak) cube.position.y += cubeSize;
    if (flag_forward) cube.position.z -= cubeSize;
    if (flag_back) cube.position.z += cubeSize;
    if (flag_left) cube.position.x += cubeSize;
    if (flag_right) cube.position.x -= cubeSize;

    // その位置に既にキューブが存在するか確認
    for (let existingCube of cubes) {
      if (
        cube.position.x === existingCube.position.x &&
        cube.position.y === existingCube.position.y &&
        cube.position.z === existingCube.position.z
      ) {
        return; // キューブが存在する場合は何もせずに終了
      }
    }

    // キューブをシーンに追加
    scene.add(cube);

    // キューブをキューブの配列に追加
    cubes.push(cube);
  }

  //ランダム
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function movePlayer(direction, speed) {
    if (keys.a) {
      player.position[direction[0]] -= speed;
    }
    if (keys.d) {
      player.position[direction[0]] += speed;
    }
    if (keys.w) {
      player.position[direction[1]] -= speed;
    }
    if (keys.s) {
      player.position[direction[1]] += speed;
    }
  }

  if (flag_forward) {
    movePlayer(["x", "z"], speed_walk);
  }
  if (flag_back) {
    movePlayer(["x", "z"], -speed_walk);
  }
  if (flag_left) {
    movePlayer(["z", "x"], speed_walk);
  }
  if (flag_right) {
    movePlayer(["z", "x"], -speed_walk);
  }
}