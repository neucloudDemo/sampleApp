<template>
    <div>
        <div class="table-con">
            <Input class="search" v-model="keyword" v-if="isSearch" placeholder="搜索"></Input>
            <Button v-if="isSearch" @click="search">搜索</Button>
            <Button v-if="isExport" class="export" @click="exportData">导出</Button>
        </div>
        <Table 
            ref="table" 
            stripe 
            :loading="loading" 
            :columns="columnsData" 
            :data="allData" 
            @on-sort-change="sortChange" 
            @on-filter-change="filterChange"
            @on-selection-change="selectionChange"></Table>
        <br/>
        <slot name="handle"></slot>
        <div style="margin: 0px;overflow: hidden">
            <Page 
                style="float: right;" 
                :total="total" 
                :page-size="pageSize" 
                :current.sync="current" 
                @on-change="onChange" 
                @on-page-size-change="onPageSizeChange"
                show-total 
                show-sizer></Page>
        </div>
    </div>
</template>
<script>
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
            currentPage: {
                type: Number,
                default: 1
            },
            exportFilename: {
                type: String,
                default: '列表数据'
            },
            keywordText: {
                type: String,
                required: false
            },
            isSearch: {
                type: Boolean,
                default: true
            },
            isExport: {
                type: Boolean,
                default: true
            },
            isRefresh: {   // 是否允许自动刷新
                type: Boolean,
                default: false
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
                total: 10,
                current: 1,
                allData: [],
                isNeedInvoke: true,
                timer: null,
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
        watch: {
        },
        created() {
            if(this.keywordText) {
                this.keyword = this.keywordText
            }
            if (Object.keys(this.originFetchData).length) {
                this.fetchData = Object.assign({}, this.fetchData, this.originFetchData)
            }
            this.getLists()
            if (this.isRefresh) {
                this.refresh()
            }
        },
		methods: {
            async getLists(params) {
                this.loading = true
                this.fetchData = Object.assign({}, this.fetchData, params)
                const model = await this.fetch.post(this.url, this.fetchData)
                this.allData = model.data
                this.total = model.pagination.rowCount
                this.loading = false
            },
            async refresh(){
                if (!this.isNeedInvoke) return
                this.isNeedInvoke = false
                this.timer = setTimeout(async () => {
                    await this.getLists()
                    this.isNeedInvoke = true
                    this.refresh()
                }, 1000*10)
            },
            // 分页
            onChange(page) {
                this.fetchData.page = page
                this.getLists()
            },
            // 搜索
            search() {
                this.current = 1
                this.fetchData.page = 1
                this.fetchData.keyword = this.keyword
                this.getLists()
            },
            // 排序（正序、倒序）
            sortChange(data) {
                this.current = 1
                this.fetchData.sort[data.key] = data.order
                this.getLists()
            },
            // 筛选
            filterChange(data) {
                if (data._isFiltered) {
                    this.current = 1
                    this.fetchData.filter[data.key] = data._filterChecked
                    this.getLists()
                }
            },
            // 导出
            exportData() {
                this.$refs.table.exportCsv({
                    filename: this.exportFilename,
                    original: false
                })
            },
            // 多选、全选，只要选中项发生变化时就会触发
            selectionChange(selection) {
                this.$emit('on-selection-change', selection)
            },
            // 全选、取消全选
            selectAll(status) {
                this.$refs.table.selectAll(status)
            },
            // 改变每页条数的回调
            onPageSizeChange(pagesize) {
                this.fetchData.pagesize = pagesize
                this.getLists()
            }
		},
        destroyed() {
            clearTimeout(this.timer)
            this.timer = null
            this.isNeedInvoke = false
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