<template>
    <div>
        <div class="table-con">
            <Input class="search" v-model.trim="keyword" placeholder="搜索"></Input>
            <Button @click="search">搜索</Button>
            <Button class="export" @click="exportData">导出</Button>
        </div>
        <Table 
            ref="table" 
            stripe 
            :loading="loading" 
            :columns="columnsData" 
            @on-filter-change="filterChange"
            :data="showData" ></Table>
        <br/>
        <slot name="handle"></slot>
        <div style="margin: 0px;overflow: hidden">
            <Page 
                style="float: right;" 
                :total="total" 
                :page-size="pageSize" 
                :current.sync="current" 
                @on-page-size-change="onPageSizeChange"
                show-total 
                show-sizer></Page>
        </div>
    </div>
</template>

<script>
    import testdata from 'views/demo/data'
    import Util from 'libs/util'
	export default {
        props: {
            url: {
                type: String,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            pageSize: {    // 当前端进行分页时需要传入
                type: Number,
                default: 20
            },
            exportFilename: { // 导出文件名
                type: String,
                default: '列表数据'
            },
            originFetchData: {  // 默认的过滤条件
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
		data () {
			return {
                loading: false,
                keyword: '',
                current: 1,
                allData: [],
                showDataOfAll: [],
                searchResult: [],  //搜索结果列表，当筛选的时候，如果之前有搜索，则在搜索结果基础上筛选
                fetchData: {
                    page: 1,
                    pagesize: this.pageSize,
                    keyword: '',
                    sort: {  // asc升序  desc降序
                        // status: 'asc'
                    },
                    filter: {
                        // status: 'confirm'
                    }
                }
			}
        },
		computed: {
            showData() {
                let data = []
                let index = (this.current - 1) * this.pageSize;
                // fenye
                data = this.showDataOfAll.slice(index, index + this.pageSize);
                return data
            },
            total() {
                return this.showDataOfAll.length
            },
            columnsData() {
                const columns = this.columns.map((item) => {
                    if (item.hasOwnProperty('filters')) {
                        item = Object.assign({}, item, {
                            // filterMultiple: false,
                            filterRemote(value) {}
                        })
                    }
                    return item
                })
                return columns
            }
        },
        mounted() {
            if (Object.keys(this.originFetchData).length) {
                this.fetchData = Object.assign({}, this.fetchData, this.originFetchData)
            }
            this.searchResult = Util.deepCopy(this.allData)
            this.getLists()
        },
        watch: {
        },
		methods: {
            async getLists(params) {
                this.allData = Util.deepCopy(testdata)
                this.showDataOfAll = Util.deepCopy(testdata)
                // this.loading = true
                // this.fetchData = Object.assign({}, this.fetchData, params)
                // const { data } = await this.fetch.post(this.url, this.fetchData)
                // this.allData = data.data
                // this.total = data.total
                // this.loading = false
            },
            search() {
                let data = []
                if (!this.keyword) {
                    // 搜索关键字为空
                    this.showDataOfAll = Util.deepCopy(this.allData)
                } else {
                    const keyword = this.keyword.toLowerCase()
                    const allData = Util.deepCopy(this.allData)
                    this.showDataOfAll = allData.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(keyword) > -1
                        })
                    })
                    this.searchResult = Util.deepCopy(this.showDataOfAll)
                }
                this.current = 1
            },
            // 筛选
            filterChange(data) {
                const basedata = this.keyword ? Util.deepCopy(this.searchResult) : Util.deepCopy(this.allData)
                if (data._isFiltered) {
                    this.showDataOfAll = basedata.filter(function(row) {
                        return data._filterChecked.indexOf(row[data.key]) != -1
                    })
                    this.current = 1
                } else {
                    // 重置
                    this.showDataOfAll = basedata
                    this.current = 1
                }
            },
            // 导出
            exportData() {
                this.$refs.table.exportCsv({
                    filename: this.exportFilename,
                    original: false
                })
            },
            // 改变每页条数的回调
            onPageSizeChange(pagesize) {
            }
		}
	}
</script>
<style lang="less" scoped>
    .table-con{
        position: relative;
        padding-bottom: 12px;
        .search{
            width: 250px;
            margin-right: 3px;
        }
        .export{
            position: absolute;
            right: 0px;
        }
    }
</style>