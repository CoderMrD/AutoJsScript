// // auto.waitFor();


function GetCenter(component) {
    let x = component.bounds().centerX()
    let y = component.bounds().centerY()
}
function init() {
    const WIDTH = Math.min(device.width, device.height);
    const HEIGHT = Math.max(device.width, device.height);
    console.log(WIDTH,HEIGHT);
    setScreenMetrics(WIDTH, HEIGHT);
}


function scrollForward(retryCount) {
    while (retryCount > 0) {
        let scrollSucceed = swipe(parseInt(WIDTH / 2), HEIGHT-100, parseInt(WIDTH / 2),  parseInt(HEIGHT / 12), 500);
        if (scrollSucceed) {
            return true;
        } else {
            console.info(`滑动失败，重试中`);
            retryCount--;
            sleep(1000);
        }
    }
    return false;
}

const indexPage = 0
const myPage = 1
const fuliPage = 2
const adPage = 3

function logCurrentPage(page) {
    console.log(`当前页面是：${page}`)
}

function getState() {
    console.log("获取当前页面")
    // fuli page
    let 视频福利 = text("看视频领福利").findOne(100)
    if (视频福利) {
        logCurrentPage("领福利页面")
        return [fuliPage, 视频福利]
    }
    // my page
    let fuli = text("福利中心").findOne(100)
    if (fuli) {
        logCurrentPage("我的")
        return [myPage, fuli.parent()]
    }

    // index page
    let my = id("view_tab_title_title").className("android.widget.TextView").text("我").findOne(100)
    if (my) {
        logCurrentPage("首页")
        return [indexPage, my.parent().parent()]
    }


    logCurrentPage("未知页面")
    return false
}

function enter() {
    console.show(true)
    init()
    console.log("开始")
    while (true) {
        let state = getState()
        sleep(5000)
        if (!state) {
            console.error("页面错误，异常退出")
            return
        }
        
        console.log(state[1])
        console.log(state[1].bounds().centerX(), state[1].bounds().centerY())
        if (state[0] == fuliPage) {
            qidian()
            return
        } else {
            state[1].click()
        }
    }
}

enter()
// let fuli = text("福利中心").findOnce()
// if (fuli) {
//     fuli.click()
//     console.log(fuli.bounds().centerX(), fuli.bounds().centerY())
//     logCurrentPage(fuli)
// }

// qidian()
// // 起点看视频领章节卡
function qidian() {
    console.log("开始看视频")
    let finish = text("明日再来吧").findOnce()
    if (finish) {
        console.log("福利领取结束")
        return
    }

    let startTime1 = Date.now();
    while (true) {
        let 视频福利 = text("看视频领福利").findOne(1000)
        if (视频福利) {
            视频福利.click()
        }
        
        sleep(1000)
        
       
       
        let continueWatch = text("继续观看").findOnce()
        if (continueWatch) {
            continueWatch.click()
        }

        let startTime = Date.now();
        var timeoutLimit = 2000;
        while (true) {
            
        bofang = text("播放").findOne(1000)
        if (bofang)
        {
            bofang.parent().parent().click()
            }

            let 未看完 = className("android.widget.TextView").textContains("秒后").findOnce()
            if (未看完 || textContains("观看完视频").findOne(1000)) {
                console.log("未看完，等待三秒")
                sleep(3000)
                let endTime = Date.now();
                let elapsedTime = endTime - startTime;
                if (elapsedTime > 30 * 1000) {
                    console.error("超过30秒仍未看完,异常退出")
                    break
                }
            } else {
                sleep(3000)
                let skipAD = className("android.widget.TextView").text("跳过广告").findOnce()
                if (skipAD) {
                    console.info("已看完，跳过广告")
                    skipAD.click()
                    break
                } else {
                    console.log("未找到跳过按钮，尝试找x")
                    let x = className("android.widget.ImageView").clickable(true).findOnce()
                    if (x) {
                        console.log("点击x")
                        x.click();
                        break
                    } else {
                        console.log("点击x坐标")
                        click(96, 162)
                        break
                    }
                }

            }
        }

        let iKnow = text("我知道了").findOne(1000)
        if (iKnow) {
            console.log("我知道了")
            iKnow.click()
        }
        let startTime2 = Date.now();
        if ((startTime2 - startTime1) > 180 * 1000) {
            console.error("总时间超过180秒，超时退出")
            break
        }
    }

}
// // killApp(packageName)

// function killApp(packageName) {
//     let forcedStopStr = ["结束", "停", "强"];
//     if (packageName) {
//         app.openAppSetting(packageName);//进入应用设置信息
//         // text(appName).waitFor();//等待查询到名字出现
//         for (var i = 0; i < forcedStopStr.length; i++) {
//             if (textContains(forcedStopStr[i]).exists()) {//判定关键字是否存在
//                 sleep(500);
//                 let forcedStop = textContains(forcedStopStr[i]).findOne(2000);
//                 if (forcedStop.enabled()) {
//                     text("结束运行").waitFor();
//                     //这里的结束运行不能被点击,我用控件中心点来点击
//                     var 结束运行 = text("结束运行").findOne().bounds();
//                     click(结束运行.centerX(), 结束运行.centerY());
//                     sleep(500);
//                     forcedStop.click();
//                     text("确定").findOne().click();
//                     sleep(1000);
//                     home();
//                     break;
//                 }
//             }
//         }
//     }
// }

// let forcedStopStr = ["结束", "停", "强"];
// // let forcedStop = textContains(forcedStopStr[0]).findOne(2000);
// let forcedStop = className("android.widget.LinearLayout").descContains(forcedStopStr[0]).findOne(1000)
// if(forcedStop) {
// // console.log(forcedStop)
// let result = forcedStop.click()
// console.log(result)
// ok = text("确定").findOne(1000)
// console.log("11111111")
// if(ok) {
// console.log("pppppppppp")
// console.log(ok.bounds())
// } else{
// console.log("no ok")
// }
// }
// exit()