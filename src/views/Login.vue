<template xmlns:text-align="http://www.w3.org/1999/xhtml">
    <div id="Login">
        <div >
            <br><br><br><br><br>
            <h1>登录</h1>
            <br>
            <el-row>
                <el-col :span="6" :offset="9">
                    <div id="app">
                        <el-input placeholder="请输入账号"  v-model="username" clearable></el-input>
                    </div>
                </el-col>
            </el-row>
            <br>
            <br>
            <el-row>
                <el-col :span="6" :offset="9">
                    <div class="grid-content bg-purple">
                        <div id="app2">
                            <el-input placeholder="请输入密码"  v-model="password"
                                      show-password></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <br>
            <br>
            <el-row>
                <el-col :span=3 :offset="13">
                        <el-button type="primary" round @click="submit">登录</el-button>
                </el-col>
            </el-row>
            <br>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: '',
                dialogVisible: false,
                options: [{
                    value: '2',
                    label: '患者'
                }, {
                    value: '3',
                    label: '医师'
                }, {
                    value: '1',
                    label: '管理员'
                }],
                form: {
                    tel: '',
                    type: '',
                },
                formLabelWidth: '120px',
                value: ''
            }
        },
        mounted () {
        },
        methods: {
            submit: function () {
                if (this.username === '') {
                    this.$message({
                        showClose: true,
                        message: '用户名不能为空！',
                        type: 'warning'
                    })
                    return
                }
                if (this.password === '') {
                    this.$message({
                        showClose: true,
                        message: '密码不能为空！',
                        type: 'warning'
                    })
                    return
                }
                this.$axios({
                    url: 'checkAdmin',
                    method: 'post',
                    data: {
                        username: this.username,
                        password: this.password,
                    }
                }).then(res => {
                    if (!res.data) {
                        this.$message({
                            showClose: true,
                            message: '用户名或密码错误！',
                            type: 'error'
                        })
                    } else {
                        this.changeLogin()
                        this.$session.set('username', this.username)
                        this.$router.push({
                            path: 'admin/UserManagement'
                        })
                    }
                })
            },
            changeLogin: function () {
                this.$store.commit('Login')
            },
        }
    }
</script>
<style  scoped>

</style>

<style scoped>
    h1 {
        font-size: 40px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        text-align: center;
        padding:1cm 0 0 0;
    }

    #Login{
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .el-dialog .el-dialog__body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
