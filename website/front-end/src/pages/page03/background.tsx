import React from 'react';
import store from '../../redux/store';
import * as THREE from 'three';
import './background.css';

export default class background extends React.Component {
    mount: any;
    vh: any;
    vw: any;
    currentPage: number = 3;
    scene: any;
    renderer: any;
    camera: any;
    container: any;
    gap: any[] = [];
    targetPos: any[] = [];  //组合成魔方时每个方块所在位置
    targetPos02: any[] = [];  //发散状态每个方块所在位置
    cycle: number = 600; //完成一次魔方方块合并所需基础时间
    timeGap: number = 200; //每一层魔方方块回复原位时间差
    isGathering: boolean = true; //方块聚合与发散
    count: number = 8000;//聚合发散中间过程停留时间

    init = () => {
        this.vh = document.documentElement.clientHeight;
        this.vw = document.documentElement.clientWidth;
        this.mount.height = this.vh;
        this.mount.width = this.vw;

        //场景
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xffffff, 0.1, 70);

        //相机
        this.camera = new THREE.PerspectiveCamera(45, this.vw / this.vh, 1, 1000);
        this.camera.position.set(0, 13, 20);
        this.camera.lookAt(0, 0, 0);


        //渲染
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.mount,
            antialias: true,
            alpha: true
        });
        //兼容高清屏
        //this.mount.append(this.renderer.domElement);
        this.renderer.setSize(this.vw, this.vh);

        this.addLights();
        this.addMesh();
    }

    addMesh = () => {
        this.container = new THREE.Object3D();
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
                    let material = new THREE.MeshPhongMaterial({
                        color: 'hsl(' + Math.floor(Math.random() * 360) + ',' + Math.floor(this.getRand(80, 100)) + '%,50%)',
                        transparent: true,
                        opacity: 0.8,
                        wireframe: false
                    })
                    let cube = new THREE.Mesh(cubeGeom, material);

                    let name = String(this.targetPos.length);
                    cube.name = name;
                    this.targetPos.push({
                        x: x * 3 - 3,
                        y: y * 3 - 3,
                        z: z * 3 - 3
                    });
                    let com = (y + 1) * 10;
                    let posX = x * com - com + this.getRand(-10, 10);
                    let posY = this.getRand(-30 + y * 20, -10 + y * 20);
                    let posZ = z * com - com + this.getRand(-10, 10);
                    this.targetPos02.push({
                        x: posX,
                        y: posY,
                        z: posZ
                    });
                    cube.position.set(posX, posY, posZ);
                    let temp = this.targetPos[Number(name)];
                    this.gap.push({
                        x: (temp.x - cube.position.x) / (this.cycle + y * this.timeGap),
                        y: (temp.y - cube.position.y) / (this.cycle + y * this.timeGap),
                        z: (temp.z - cube.position.z) / (this.cycle + y * this.timeGap)
                    })

                    this.container.add(cube);
                }
            }
        }
        this.scene.add(this.container);
    }

    getRand = (a: number, b: number) => {
        return Number((Math.random() * (b - a) + a).toFixed(5));
    }

    addLights = () => {
        let lightTop = new THREE.PointLight(0xffffff, 1);
        lightTop.position.set(0, 50, 0);
        this.scene.add(lightTop);

        let lightR = new THREE.PointLight(0xffffff, 0.6);
        lightR.position.set(200, 0, 200);
        this.scene.add(lightR);

        let lightL = new THREE.PointLight(0xffffff, 0.6);
        lightL.position.set(-200, 0, 200);
        this.scene.add(lightL);
    }

    animate = () => {
        let page = store.getState().page;
        if (this.currentPage === page) {
            this.container.rotation.x += 0.0005;
            this.container.rotation.y += 0.003;
            this.container.rotation.z += 0.001;

            for (let i = 0; i < this.targetPos.length; i++) {
                let cube = this.container.getObjectByName(String(i));
                if (this.isGathering) {
                    if (Math.abs(cube.position.x - this.targetPos[i].x) < 0.02 && Math.abs(cube.position.y - this.targetPos[i].y) < 0.02 && Math.abs(cube.position.z - this.targetPos[i].z) < 0.02) {
                        if (i === this.targetPos.length - 1) {
                            this.isGathering = !this.isGathering;
                            this.count = 8000;
                        }
                        continue;
                    }
                    cube.position.x += this.gap[i].x;
                    cube.position.y += this.gap[i].y;
                    cube.position.z += this.gap[i].z;
                } else if (this.count >= 0) {
                    --this.count;
                } else {
                    if (Math.abs(cube.position.x - this.targetPos02[i].x) < 0.02 && Math.abs(cube.position.y - this.targetPos02[i].y) < 0.02 && Math.abs(cube.position.z - this.targetPos02[i].z) < 0.02) {
                        if (i === this.targetPos.length - 1) {
                            this.isGathering = !this.isGathering;
                        }
                        continue;
                    }
                    cube.position.x -= this.gap[i].x;
                    cube.position.y -= this.gap[i].y;
                    cube.position.z -= this.gap[i].z;
                }
            }
            this.renderer.render(this.scene, this.camera);
        }
        requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.init();
        this.animate();
    }

    render() {
        return (
            <canvas
                ref={r => this.mount = r}
                className="page03-myCanvas"
            />
        )
    }
}