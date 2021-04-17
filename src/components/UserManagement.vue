<template>
    <div id="UserManagement">
        <!-- 账户过滤器 -->

        <el-table
                ref="filterTable"
                height="600px"
                :data="AllAccount"
                @filter-change="handleFilterChange"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="usermail"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="smtp_state"
                    label="SMTP状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="pop_state"
                    label="POP3状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="port"
                    label="端口"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, AllAccount)"
                            size="small"
                            type="danger">
                        移除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
    export default {
        name: 'UserManagement',
        data () {
            return {
                currentPage: 1,//默认开始页面
                count: 0,//筛选
                pagesize: 9,
                AllAccount: [],
                username:'',
                password:'',
                usermail:'',
                smtp_state:'',
                pop_state:'',
                port:'',
            }
        },
        mounted () {
            this.$axios({
                url: 'getUserList',
                method: 'get',
            }).then(res => {
                this.AllAccount = res.data
                console.log("数据",res.data)
            })

        },
        methods: {
            deleteRow (index, tableData) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        url: 'deleteUser',
                        method: 'post',
                        data: {
                            username: tableData[index]['username'],
                        }
                    }).then(()=> {
                        this.$axios({
                            url: 'getUserList',
                            method: 'get',
                        }).then(res => {
                            this.AllAccount = res.data
                        })
                    })

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            handleSizeChange (val) {
                this.currentPage = 1
                this.pagesize = val
            },
            handleCurrentChange (val) {
                this.currentPage = val
            },
            handleFilterChange (value) {
                this.filter = value.status
            },
            handleClose (done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done()
                    })
                    .catch(()=> {
                    })
            },
        }
    }
</script>

<style scoped>

</style>
