<template>
    <div id="MyData">
        <el-form ref="form" label-width="80px">
            <br><br><br><br>
            <el-form-item label="POP3端口">
                <el-col :span="7">
                    <el-input v-model="pop3"></el-input>
                </el-col>
            </el-form-item>
            <br>
            <el-form-item label="SMTP端口">
                <el-col :span="7">
                    <el-input v-model="smtp"></el-input>
                </el-col>
            </el-form-item>
            <br>
            <el-col :span="7" :offset="4">
                <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-col>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: 'MyData',
        data() {
            return {
                pop3: '',
                smtp: '',
            }
        },
        mounted() {
            this.$axios({
                url: "getPOP",
                method: "get",
            }).then(res => {
                this.pop3 = res.data
            })
            this.$axios({
                url: "getSMTP",
                method: "get",
            }).then(res => {
                this.smtp = res.data
            })
        },
        methods: {
            onSubmit() {
                this.$axios({
                    url: "updatePOP",
                    method: "post",
                    data: {
                        pop: this.pop3
                    }
                }).then(() => {
                    this.$message({
                        showClose: true,
                        message: "修改成功！",
                        type: 'success'
                    })

                })
                this.$axios({
                    url: "updateSMTP",
                    method: "post",
                    data: {
                        smtp: this.smtp
                    }
                })

            }
        }
    }
</script>

<style scoped>
    #MyData {
        padding: 1cm 0 0 12cm
    }
</style>