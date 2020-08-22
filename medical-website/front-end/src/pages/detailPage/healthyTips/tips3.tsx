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
                <Card.Title>1、增强人体免疫力</Card.Title>
                <Card.Text>
                    大枣含有大量的糖类物质，主要为葡萄糖，也含有果糖、蔗糖，以及由葡萄糖和果糖组成的低聚糖、阿拉伯聚糖及半乳醛聚糖等；
                    并含有大量的维生素C、核黄素、 硫胺素、胡萝卜素、尼克酸等多种维生素，具有较强的补养作用，能提高人体免疫功能，增强抗病能力。
                </Card.Text>
                <Card.Title>2、增强肌力，增加体重</Card.Title>
                <Card.Text>
                    实验小鼠每日灌服大枣煎剂，共3周，体重的增加较对照组明显升高，并且在游泳试验中，
                    其游泳时间较对照组明显延长，这表明大枣有增强肌力和增加体重的作用。
                </Card.Text>
                <Card.Title>3、保护肝脏</Card.Title>
                <Card.Text>
                    有实验证实，对四氯化碳肝损伤的家兔，每日喂给大枣煎剂共1周，结果血清总蛋白与白蛋白较对照组明显增加，表明大枣有保肝作用。
                </Card.Text>
                <Card.Title>4、抗过敏</Card.Title>
                <Card.Text>
                    大枣乙醇提取物对特异反应性疾病，能抑制抗体的产生，对小鼠反应性抗体也有抑制作用，提示大枣具有抗变态反应作用。
                </Card.Text>
                <Card.Title>5、镇静安神</Card.Title>
                <Card.Text>
                    大枣中所含有黄酮--双- 葡萄糖甙A有镇静、催眠和降压作用，其中被分离出的柚配质C糖甙类有中枢抑制作用，
                    即降低自发运动及刺激反射作用、强直木僵作用，故大枣具有安神、镇静之功。
                </Card.Text>
                <Card.Title>6、抗癌，抗突变</Card.Title>
                <Card.Text>
                    大枣含多种三该类化合物，其中烨木酸、山植酸均发现有抗癌活性，对肉瘤S-180有抑制作用。
                    枣中所含的营养素，能够增强人体免疫功能，对于防癌抗癌和维持人体脏腑功能都有一定效果。
                </Card.Text>
                <Card.Title>红枣吃多了会怎么样</Card.Title>
                <Card.Text>
                    1、过多食用红枣会导致腹胀，也就是肚子胀气。
                    2、过多食用红枣会对人体肾脏造成一定的困扰，同时会影响消化系统，会造成便秘等情况。
                    3、红枣的糖分很高，因此，糖尿病的患者要注意红枣或者红枣制成的零食是不能吃的，不热会导致糖尿病恶化。
                    4、在女性月经期出现水肿情况时是不能吃红枣的，因为红枣很甜，吃多了会生痰生湿，如此，这个时候红枣吃的越多，水肿的情况就会越严重。另外月经时出现腹胀或者体质是燥热的人也不能多吃红枣，不然会导致经血过多、腹胀更严重等情形。红枣在中医处方里，是一味最常见的药食同源方药，味甘性温，主要功能为补中益气、养血安神，临床主要用于脾胃气虚、血虚萎黄、血虚失眠多梦等症的治疗。如常喝红枣水对于经血过多而引起贫血的女性就可起到改善面色苍白和手脚冰冷的补益功效。但作为方药是有禁忌症的，如在月经期间，一些女性常会出现眼肿或脚肿的现象，其实这是湿重的表现，这类人群就不适合服食红枣。这是因为，红枣味甜，多吃容易生痰生湿导致水湿积于体内，而加重水肿症状。同时，有以服用红枣进补而又属于体质燥热的女性，也不适合在经期服食，因为这极有可能会引起经血过多而伤害身体健康。
                    5、量进食生鲜红枣，易产生腹泻并伤“脾”，因此，由于外感风热而引起的感冒、发烧者及腹胀气滞者，都属于忌吃生鲜红枣的人群。
                    6、湿盛或脘腹胀满者忌食；湿热重、舌苔黄的人不宜食用。
                    7、有宿疾、食积、便秘者不宜多吃；龋齿、牙病作痛及痰热咳嗽患者不宜食用。
                </Card.Text>
                <Card.Title>温馨提醒</Card.Title>
                <Card.Text>
                    红枣食用一般不要超过5个，小的不要超过8-9个，大枣一般就是2-3个，因为一是糖分多，吃太多会导致吸收困难、浪费，二是甜食多了，
                    会加口腔和食道负担，三是细水长流才符合营养要求。当然临时有需要，可以另当别论。如产后、失血、手术后等，一天煮食10多个问题不大。
                </Card.Text>
            </>
        )
    }
}