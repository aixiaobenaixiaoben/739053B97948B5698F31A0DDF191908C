/** @flow */
import React, {Component} from "react"
import {ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native"
import style from "../styles/Login/LoginAgreement"
import {COLOR_WHITE} from "../../../../Style"
import Ionicons from "react-native-vector-icons/Ionicons"


class LoginAgreement extends Component<any, any> {

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft:
        <TouchableOpacity onPress={() => navigation.pop()} style={{paddingLeft: 9, paddingTop: 4,}}>
          <Ionicons name='ios-arrow-back' size={36} color={COLOR_WHITE}/>
        </TouchableOpacity>
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('default')
  }

  render() {
    return (
      <View style={style.container}>

        <View style={style.back}>
          <Text style={style.backText}>网页由 market.cmbchina.com 提供</Text>
        </View>

        <ScrollView style={style.scrollView}>
          <View style={style.content}>
            <Text style={style.h1}>招商银行App服务协议</Text>
            <Text style={style.h3}>        招商银行App服务（以下简称“本服务”）是指招商银行依托移动通信运营商网络、通过手机终端向您提供的金融服务。本协议是招商银行与您就本服务的使用等相关事项所订立的有效合约。您登录招商银行App，即表示您知悉、理解并同意接受本协议的全部内容，确认承担由此产生的一切法律后果。</Text>
            <Text style={style.h3}>        在确认接受本协议之前，请您务必仔细阅读、充分理解本协议全部内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议并选择接受或不接受（如有）。如果您不同意本协议的任何内容，或者无法准确理解相关条款的含义，请不要进行后续操作。</Text>
            <Text style={style.h2}>        一、使用</Text>
            <Text style={style.h3}>        1.您自愿使用招商银行App，您通过招商银行App办理业务时须同时遵守与该业务相关的章程、协议及交易规则。</Text>
            <Text style={style.h3}>        2.您已了解招商银行提供的App服务是应用手机通讯方式提供的金融服务，可能因网络或通讯线路故障及断电、停电等其他招商银行不可预测、不可控制的因素，导致您在使用招商银行App服务的过程中出现登录失败、网页打开速度慢、信息传送延误与错误以及业务暂时无法办理或者被取消、暂停或终止的情况。如出现上述情况，您可在上述意外因素消失后重新在招商银行App上使用相关服务，或者到招商银行营业网点或通过其它自助渠道办理。您因上述不可预测不可控制的情况以及其他非因招商银行原因遭受的损失，招商银行不承担责任。</Text>
            <Text style={style.h3}>        3.您可以直接从招商银行门户网站（http://www.cmbchina.com）或其他招商银行合法授权的第三方下载招商银行App客户端，不要下载并使用来历不明的客户端软件。如果您从未经招商银行合法授权的第三方获取冠名为“招商银行App”或与招商银行App名称相似的安装程序，招商银行无法保证该软件能够正常使用，由此产生的后果由您自行承担。</Text>
            <Text style={style.h3}>        4.招商银行App客户端软件提供包括iOS、Android两个应用版本，您应选择与所安装终端设备相匹配的软件版本。</Text>
            <Text style={style.h3}>        5.您理解并同意：为了向您提供有效的服务，招商银行App会使用您终端设备的处理器和带宽等资源。招商银行App使用过程中可能产生数据流量的费用，您需自行向运营商了解相关资费信息，并自行承担相关费用。</Text>
            <Text style={style.h3}>        6.您保证向招商银行提供的资料真实、合法、有效、完整，因您未提供真实、合法、有效、完整的资料或资料发生任何变更而没有及时通知招商银行导致本服务无法提供或提供时发生任何错误，由此产生的后果由您自行承担。若招商银行有合理理由怀疑您提供的资料不实、非法、无效或不完整，招商银行有权拒绝、暂停或终止向您提供本服务，招商银行对此不承担任何责任，您将承担因此产生的责任和损失。</Text>
            <Text style={style.h3}>        7.您有责任妥善保管本人账户、密码、动态口令及证件号码、手机及手机号码等与本服务相关的信息，您使用上述信息进行的交易均为您本人办理的交易。你丧失对上述信息的掌控并导致因此发生任何风险或资金损失的，您将自行承担后果与责任。App交易指令一经确认，您不得要求变更或撤销。您的交易信息以招商银行系统记录的资料为准（有确凿证据证明招商银行系统记录错误的除外），您认可招商银行系统记录数据的真实性、准确性和合法性。</Text>
            <Text style={style.h3}>        8.您不得利用招商银行App服务从事包括但不限于洗钱、欺诈等违法、违规行为；招商银行有理由合理怀疑您进行违法违规行为的，有权中止、停止向您提供App服务或者采取其他合理的风险控制措施。</Text>
            <Text style={style.h2}>        二、声明与承诺</Text>
            <Text style={style.h3}>        1. 您知悉并同意招商银行为本服务收集、使用并传递您的姓名、证件号码、银行卡号、手机号码等个人资料。</Text>
            <Text style={style.h3}>        2．您知悉并同意：为完善服务内容、改善服务体验，招商银行有权根据业务发展需要对App系统进行升级、改造，以及对App服务功能、内容及方式等进行调整。</Text>
            <Text style={style.h3}>        3.招商银行有权根据法律法规政策、系统升级、业务发展需要等合理原因修改本协议，您可以在招商银行App的最新版本中查阅相关协议条款。本协议条款变更后，如果您继续使用招商银行App，即视为您已充分阅读、理解、同意并接受修改后的协议。如果您不接受修改后的协议，应当停止使用招商银行App。</Text>
            <Text style={style.h3}>        4.您同意并授权招商银行在与您发生贷款或者担保等信用业务时，可以向依法设立的征信机构及其他相关合法机构查询、使用或提供您的信用、资产信息；您同意并授权招商银行为了保障您的交易安全、预防您的账户被他人不法侵害，可以向依法设立的电信运营商等合法机构（包括但不限于中国电信、中国移动、中国联通等外部合作机构），查询、使用或提供您包括但不限于您的手机号码、地理位置、行为、设备等相关信息，并保留相关资料。招商银行依法对您的相关信息承担保密责任，并保证要求合作机构对您的相关信息承担保密责任。</Text>
            <Text style={style.h3}>        5.为方便您的招商银行App交易，招商银行从第三方获取一些金融资讯，并通过招商银行官网和App系统提供给您，此类信息仅供参考，资讯的甄别、使用由您自行决策。因投资决策产生的后果，由您自行承担。</Text>
            <Text style={style.h3}>        6.您通过招商银行App办理业务，须按招商银行门户网站对外公告的服务价格支付相关费用，具体收费内容和收费标准以招商银行最新公告为准。如遇费用调整,招商银行将在门户网站以对外公告的形式通知您，您有权选择是否继续使用相关服务。如您不同意接受公告内容，应向招商银行提出申请变更或终止相关服务，否则视为您同意接受公告内容。</Text>
            <Text style={style.h3}>        7.您有权选择卸载招商银行App软件，您完成卸载招商银行App软件时本服务即终止。同时，若您违反本协议或相关章程及业务规则，招商银行有权单方暂停或终止向您提供App服务，并保留追究您责任的权利。本服务暂停、终止后，在暂停、终止前您已发送至招商银行的交易指令仍有效，您应承担其后果。</Text>
            <Text style={style.h2}>        三、其他</Text>
            <Text style={style.h3}>        1.招商银行已提请您特别注意有关免除、限制银行责任，和银行单方面拥有某些权利以及增加您义务或免除、限制您权利的条款，并已应您的要求对上述条款予以充分解释说明，各方对本协议条款的理解完全一致，并自愿接受约束。</Text>
            <Text style={style.h3}>        2.若您与招商银行之间发生争议，由双方协商解决，协商不成提起诉讼的，由招商银行总行所在地法院管辖。</Text>
            <Text style={style.h3}>        3.本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律，法律无明文规定的，可适用国内通行的金融惯例。</Text>
            <Text style={style.h3}>        4.本协议条款无论因何种原因部分无效或不可执行，都不影响本协议其他条款的效力。</Text>
            <Text style={style.h3}>        5.本协议中未尽事宜，按照法律法规和招商银行相关业务规则及国内通行的金融惯例办理。</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default LoginAgreement