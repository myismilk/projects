import React from 'react';
import * as THREE from 'three';
import store from '../../redux/store';
import './background.css';

interface props {
    resizeCount: number;
}

export default class background extends React.Component<props, {}>{
    mount: any;
    scene: any;
    renderer: any;
    camera: any;
    vh: any;
    vw: any;
    points: any = []; //轨迹坐标
    path: any; //路径
    tubeDetail: number = 800; //将路径分成n份
    circlesDetail: number = 10; //每份圆上平均分布着n个点
    radius: number = 5; //管道半径
    frames: any; //组成管道的所有圆环
    geometory: any;
    percentage: number = 0;
    currentPage: number = 1;//当前显示的页面序号

    constructor(props: props) {
        super(props);
    }

    componentWillReceiveProps(props: props) {
        this.init();
    }

    init = () => {
        //初始化宽高
        this.vh = document.documentElement.clientHeight;
        this.vw = document.documentElement.clientWidth;
        this.mount.height = this.vh;
        this.mount.width = this.vw;

        //初始化通道轨迹坐标与路径
        this.points = [
            [68.5, 185.5],
            [1, 262.5],
            [270.9, 281.9],
            [345.5, 212.8],
            [178, 155.7],
            [240.3, 72.3],
            [153.4, 0.6],
            [52.6, 53.3],
            [68.5, 185.5]
        ];
        for (let len = this.points.length, i = 0; i < len; i++) {
            let x = this.points[i][0];
            let y = Math.random() * 100;
            let z = this.points[i][1];
            this.points[i] = new THREE.Vector3(x, y, z);
        }

        //建立路径
        this.path = new THREE.CatmullRomCurve3(this.points);
        this.path.closed = true;

        //场景
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 30, 150);

        //渲染
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.mount,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.vw, this.vh);

        //相机
        this.camera = new THREE.PerspectiveCamera(50, this.vw / this.vh, 0.1, 200);
        this.camera.position.set(0, 400, 400);


        this.addGeometory();
    }

    addGeometory = () => {
        this.frames = this.path.computeFrenetFrames(this.tubeDetail, true);
        this.geometory = new THREE.Geometry();

        //往管道上添加物体
        let cube = new THREE.BoxBufferGeometry(4, 4, 4);
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        let cubeMesh = new THREE.Mesh(cube, material);
        let container = new THREE.Object3D();
        this.scene.add(container);

        //遍历每一个圆环
        //对每个圆环上的点进行定位时，相对上一个圆环该位置的点的偏移角度，以此制造螺旋效果
        let gap = 0.02;
        for (let i = 0; i < this.tubeDetail; i++) {
            //以下计算牵涉到弗莱纳公式
            //获取normal值
            let normal = this.frames.normals[i];
            //获取binormal值
            let binormal = this.frames.binormals[i];

            //计算当前圆环对应的索引值（0～1）
            let index = i / this.tubeDetail;
            //获取当前圆环中心的坐标
            let p = this.path.getPointAt(index);

            //对当前圆环上的每个点进行循环
            //let circle = new THREE.Geometry();

            gap += 0.02;
            for (let j = 0; j < this.circlesDetail; j++) {
                //复制中心点的坐标
                let position = p.clone();
                //计算当前点在圆环中对应的角度值（0～2*PI）
                let angle = (j / this.circlesDetail) * Math.PI * 2;
                angle += gap * Math.PI;
                //计算sin值和cos值
                let sin = Math.sin(angle);
                let cos = -Math.cos(angle);

                //根据角度计算每个点的三维坐标
                let normalPoint = new THREE.Vector3(0, 0, 0);
                normalPoint.x = (cos * normal.x + sin * binormal.x);
                normalPoint.y = (cos * normal.y + sin * binormal.y);
                normalPoint.z = (cos * normal.z + sin * binormal.z);
                //单位向量长度乘以半径得到圆心指向改点的长度（个人理解）
                normalPoint.multiplyScalar(this.radius);

                //将每个normal值添加到每个中心点上
                position.add(normalPoint);

                let color = new THREE.Color('hsl(' + index * 10 * Math.floor(Math.random() * 60 + 300) + ", 50%, 50%)");
                let mesh = cubeMesh.clone(false);
                mesh.position.set(position.x, position.y, position.z);
                let temp = material.clone();
                temp.color = color;
                mesh.material = temp;

                //mesh.rotation.x = Math.random() * Math.PI * 2;
                //mesh.rotation.y = Math.random() * Math.PI * 2;
                //mesh.rotation.z = Math.random() * Math.PI * 2;
                container.add(mesh);

                //将顶点添加到圆环上
                //circle.vertices.push(position);
            }
            //放入第一个点形成回路（环）
            /*circle.vertices.push(circle.vertices[0]);
            let material = new THREE.LineBasicMaterial({
                color: new THREE.Color('hsl(' + index * 10 * Math.floor(Math.random() * 60 + 300) + ", 50%, 50%)")
            });
            //添加圆环到场景中
            let line = new THREE.Line(circle, material);
            this.scene.add(line);*/

            //添加点
            /*let pointsMaterial = new THREE.PointsMaterial();
            let tube = new THREE.Points(this.geometory, pointsMaterial);
            this.scene.add(tube);*/
        }
    }

    animate = () => {
        this.currentPage = store.getState().page;
        if (this.currentPage === 5) {
            this.percentage += 0.0005;
            let p1 = this.path.getPointAt(this.percentage % 1);
            let p2 = this.path.getPointAt((this.percentage + 0.001) % 1);
            this.camera.position.set(p1.x, p1.y, p1.z);
            this.camera.lookAt(p2);
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
                className="page05-background"
            />
        )
    }
}