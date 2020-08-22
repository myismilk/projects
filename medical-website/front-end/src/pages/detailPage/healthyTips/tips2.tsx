import React from 'react';
import { Card } from 'react-bootstrap';

interface props {
    content: string;
}

interface state {
    content: string;
}

export default class tip extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            content: this.props.content
        }
    }
    render() {
        return (
            <>
                <Card.Text>
                    很多人因为晚起床的问题，所以养成了不吃早饭的习惯。如今，也是有不少的都市上班族有这样的坏习惯。
                    但是，提醒大家，不管什么塬因，为了自己的康体健康，大家一定要把一些不好的习惯丢掉。
                    那么，你知道不吃早饭的四个常见危害吗？一起来看看吧。
                </Card.Text>
                <Card.Title>1、让你反应迟钝</Card.Title>
                <Card.Text>
                    早饭是大脑活动的能量之源，如果没有进食早餐，体内无法供应足够血糖以供消耗，
                    便会感到倦怠、疲劳、脑力无法集中、精神不振、反应迟钝。
                </Card.Text>
                <Card.Title>2、慢性病可能“上”身</Card.Title>
                <Card.Text>
                    不吃早餐，饥肠辘辘地开始一天的工作，身体为了取得动力，会动用甲状腺、副甲状腺、脑下垂体之类的腺体，
                    去燃烧组织，除了造成腺体亢进之外，更会使得体质变酸，患上慢性病。
                </Card.Text>
                <Card.Title>3、肠胃可能要“造反”</Card.Title>
                <Card.Text>
                    不吃早餐，直到中午才进食，胃长时间处于饥饿状态，会造成胃酸分泌过多，于是容易造成胃炎、胃溃疡。
                </Card.Text>
                <Card.Title>4、便秘“出笼”</Card.Title>
                <Card.Text>
                    在叁餐定时情况下，人体内会自然产生胃结肠反射现象，简单说就是促进排便。若不吃早餐成习惯，
                    长期可能造成胃结肠反射作用失调，于是产生便秘。
                </Card.Text>
            </>
        )
    }
}