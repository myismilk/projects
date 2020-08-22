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
                    现在人们的生活压力越来越大，很多工作者都会出现睡眠不规律的情况，
                    有的时候加班到凌晨都不睡觉，早上的时候还要早早的起床，其实这样对身体的影响是比较大的。
                    养成一个规律的作息对身体的好处是比较多的，而且也可以提高第二天的工作效率。
                </Card.Text>
                <Card.Title>规律作息有什么好处？</Card.Title>
                <Card.Title>1、有效提高身体的免疫能力</Card.Title>
                <Card.Text>
                    养成一个规律的作息可以很好的提高身体的免疫能力，而且不管是从西医的方面还是从中医的方面来说，
                    规律的作息习惯对身体健康的好处是比较多的，早上早早的起床能够增强身体的免疫能力，
                    睡觉过晚或者是睡眠比较少的话都会对身体的免疫能力有很大的影响。早起对人们减轻压力也有很大的好处，要做好一天的工作安排。
                </Card.Text>
                <Card.Title>2、促进身体的排毒</Card.Title>
                <Card.Text>
                    规律的作息能够有效的促进身体的新陈代谢，促进身体的废物排除体外，
                    这样身体的内脏就可以得到很好的休息，还能够让人的精力比以前更加的充足。
                    一般早睡指的就是在晚上十点左右去睡觉。建议不要超过晚上十点，因为身体的最佳排毒时间是十一点左右，
                    十一点的时候身体就开始排出毒素了。
                </Card.Text>
                <Card.Title>3、提高工作效率</Card.Title>
                <Card.Text>
                    早上早早的起床可以让人们的头脑清晰，而且人体的大脑在经过一整晚的休息之后也得到了很好的恢复，
                    身体的骨骼和肌肉在注意以后会变得非常协调了。起床的时候，建议朋友们伸展一下自己的筋骨，
                    活动一下。一般情况下，建议洗漱之后就可以开始一整天的工作了，我们会发现自己工作起来效率很高，工作可以完成的更好了。
                </Card.Text>
                <Card.Title>4、促进身体健康</Card.Title>
                <Card.Text>
                    早上早早的起床之后，再去锻炼一下能够起到很好的降低血压的作用，而且对身体预防血栓等疾病也有很多的好处。
                    此外，早起还能够促进身体的肠道蠕动，对食物的消化也有很多的好处。科学研究证明，
                    早起可以调节眼睛的视力，还有利于增加身体的肺活量。
                </Card.Text>
                <Card.Title>温馨提示</Card.Title>
                <Card.Text>
                    建议朋友们每天至少睡八个小时，不要睡的太长或者是睡的太短，八个小时的时间可以让身体得到充分的休息。
                    睡觉的时候建议保持空气流通，也要保持环境安静，这样有助于更好的休息，对身体的好处是比较多的。
                </Card.Text>
            </>
        )
    }
}