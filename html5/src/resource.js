var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    shoot_background_png : "res/shoot_background_png",
    shoot_background_plist :"res/shoot_background_plist",
    enemy1_png:"res/enemy1.png",
    BMFont_fnt:"res/font/font.fnt",
    ui_json:"res/ui.json",
    gameOver_json:"res/gameOver.json",
    Node_json:"res/Node.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}