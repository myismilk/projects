import React from 'react';
import { Carousel } from 'react-bootstrap';
import sleep from '../../img/healthyTips/sleep.png';
import breakfast from '../../img/healthyTips/breakfast.png';
import jujube from '../../img/healthyTips/jujube.png';
import { Link } from 'react-router-dom';
import './tips.less';

export default class tips extends React.Component {

    toTips = (page: number) => {
        let tip: any;
        if (page === 1)
            tip = document.getElementById("tipsLink1");
        else if (page === 2)
            tip = document.getElementById("tipsLink2");
        else if (page === 3)
            tip = document.getElementById("tipsLink3");
        tip?.click();
    }

    render() {
        return (
            <div className="tips-container">
                <h2 className="tips-title">健康小贴士</h2>
                <hr className="split-line" />
                <div className="tips-body">
                    <Link to={{
                        pathname: "/healthyTips",
                        state: { page: 1, content: '规律作息的好处' }
                    }}
                        id="tipsLink1"
                    />
                    <Link to={{
                        pathname: "/healthyTips",
                        state: { page: 2, content: '长期不吃早餐 伤害身体健康'}
                    }}
                        id="tipsLink2"
                    />
                    <Link to={{
                        pathname: "/healthyTips",
                        state: { page: 3, content: '多吃红枣的好处' }
                    }}
                        id="tipsLink3"
                    />

                    <Carousel>
                        <Carousel.Item onClick={this.toTips.bind(this, 1)}>
                            <img
                                className="d-block w-100"
                                src={sleep}
                                alt="规律作息的好处"
                            />
                            <Carousel.Caption>
                                <h3>规律作息的好处</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item onClick={this.toTips.bind(this, 2)}>
                            <img
                                className="d-block w-100"
                                src={breakfast}
                                alt="长期不吃早餐 伤害身体健康"
                            />

                            <Carousel.Caption>
                                <h3>长期不吃早餐 伤害身体健康</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item onClick={this.toTips.bind(this, 3)}>
                            <img
                                className="d-block w-100"
                                src={jujube}
                                alt="多吃红枣的好处"
                            />

                            <Carousel.Caption>
                                <h3>多吃红枣的好处</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        )
    }
}