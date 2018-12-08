var vm = new Vue({
    el: '#app',
    data: {
        a: 1,
        other_avatar: 'img/0.jpeg',
        my_avatar: 'img/0.jpeg',

        editInfo:null,

        wechat: {
            isEdit:true,
            contentHeight: 1200,

            title:'ZuoAn斜阳🌵',
            isShowNick:false, //是否显示昵称，一般用在群里，如果是个人聊天的话，肯定显示

            messageType: {
                //"RedPacket红包 Transfer转账 Voice声音 Location位置 Camera视频 Album图片 ContactCard推荐联系人"
                Time:'time',
                Text: 'Text',  //文本消息 优先级高
                Voice: 'Voice', //音频消息
                RedPacket: 'RedPacket',  //红包消息
                Transfer:'Transfer', //转账信息
                Transfer2:'Transfer2', //确认转账
            },

            users:[
                {
                    id:0, //随机不一样就行
                    nick:'厄尔',
                    avatar:'img/0.jpeg',
                    isMe:true,
                },
                {
                    id:1, //随机不一样就行
                    nick:'ZuoAn斜阳🌵',
                    avatar:'img/1.jpeg',
                }
            ],
            list:[],
        }
    },
    methods: {
        greet: function (event) {
            //`this` 在方法里指向当前 Vue 实例
            alert('Hello ' + this.name + '!')
            // `event` 是原生 DOM 事件
            if (event) {
                alert(event.target.tagName)
            }
        },
        uploadImage: function (type) {
            var e = e || window.event;
            var _this = this;
            var MyTest = e.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(MyTest);
            reader.onload = function (theFile) {
                var image = new Image();
                image.src = theFile.target.result;
                _this.wechat.users[type].avatar = theFile.target.result
            };
        },

        checkMessageType:function (e) {
            this.editInfo.type = e.target.value
        },
        editItem:function (item) {
            this.editInfo = item;
            console.log(item.type);
        },
        deleteItem:function (item) {
            var _this = this;
            this.wechat.list.forEach(function (t,index) {
                if(t == item){
                    console.log("sdfdsfsdf")
                    _this.wechat.list.splice(index,1)
                }
            })
            _this.editInfo = null;
        },

        addPrev:function (item) {
            var _this = this;

            var len = this.wechat.list.length;
            for(var i = 0;i<len;i++){
                if( this.wechat.list[i] == item){
                    var newItem = {
                        type:item.type,
                        text:'输入文本数据',  //可以提供几种觉的微信时间格式
                        user:item.user,
                    }
                    _this.wechat.list.splice(i,0,newItem)
                    _this.editInfo = newItem;
                    break;
                }
            }

        },
        addNext:function (item) {
            var _this = this;
            var len = this.wechat.list.length;
            for(var i = 0;i<len;i++){
                if( this.wechat.list[i] == item){
                    var newItem = {
                        type:item.type,
                        text:'输入文本数据',  //可以提供几种觉的微信时间格式
                        user:item.user,
                    }
                    _this.wechat.list.splice(i+1,0,newItem)
                    _this.editInfo = newItem;
                    break;
                }
            }
        },

        /**
         * 选择用户
         * @param user
         */
        selectUser:function (user) {
            this.editInfo.user = user;
        },

        /**
         * 设置我
         * @param user
         */
        setMe:function (user) {

        },

        initList:function () {
            this.wechat.list = [
                {
                    user:this.wechat.users[0],
                    type:'time',
                    text:'12月1日 下午16:19'  //可以提供几种觉的微信时间格式
                },
                {
                    user:this.wechat.users[0],
                    type: 'Text', //消息类型
                    text:'借我200块钱，明天还你'+this.wechat.title,
                },
                {
                    type:'time',
                    text:'12月1日 下午18:19'  //可以提供几种觉的微信时间格式
                },
                {
                    user:this.wechat.users[1],
                    type: 'Transfer', //消息类型
                    text:'转账给ZuoAn斜阳🌵',
                    money:'￥200.00',
                    status:'transfer',
                },

                {
                    user:this.wechat.users[1],
                    type: 'Transfer2', //消息类型
                    text:'转账给ZuoAn斜阳🌵',
                    money:'￥200.00',
                    status:'confirm',
                },

                {
                    user:this.wechat.users[1],
                    type: 'Text', //消息类型
                    text:'记得还',
                },
                {
                    user:this.wechat.users[0],
                    type: 'Text', //消息类型
                    text:'明天还你',
                },

                {
                    user:this.wechat.users[0],
                    type:'time',
                    text:'12月3日 中午12:19'  //可以提供几种觉的微信时间格式
                },
                {
                    user:this.wechat.users[1],
                    type: 'Text', //消息类型
                    text:'什么时候还钱？',
                },

                {
                    user:this.wechat.users[0],
                    type:'time',
                    text:'12月4日 下午13:29'  //可以提供几种觉的微信时间格式
                },
                {
                    user:this.wechat.users[1],
                    type: 'Text', //消息类型
                    text:'是不是骗钱呢？',
                },

                {
                    user:this.wechat.users[0],
                    type:'time',
                    text:'12:19'  //可以提供几种觉的微信时间格式
                },
                {
                    user:this.wechat.users[1],
                    type: 'Text', //消息类型
                    text:'是不是骗钱呢？都多长时间了',
                },
            ]
        }
    },
    created: function () {
        this.initList();
    }
})