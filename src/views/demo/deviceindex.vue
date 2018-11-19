<template>
    <Card>
        <p slot="title">指标列表：</p>
        <v-table
            ref="demotable"
            :url="url"
            :columns="columns"
            :pageSize="10"
            :originFetchData="originFetchData">
        </v-table>
    </Card>
</template>
<script>
    import Table from 'views/base/server-table'
    export default {
        data() {
            return {
                url: '/api/metadataindex',
                originFetchData: {  // 列表的初始过滤条件
                    filter: {
                    }
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '设备名称',
                        key: 'devicename',
                        render: (h, params) =>{
                            return h('span', params.row.deviceName.name);
                        }
                    },
                    {
                        title: '指标名称',
                        key: 'name' || ''
                    },
                    {
                        title: '字段名称',
                        key: 'key'
                    },
                    {
                        title: '网关ID',
                        key: 'gateway_id',
                        render: (h, params) => {
                            if(params.row.gateway_id === null) { return}
                            return h('span', params.row.gateway_id);
                        }
                    },
                    {
                        title: '数据点ID',
                        key: 'varid',
                        render: (h, params) => {
                            if(params.row.varid === null) { return}
                            return h('span', params.row.varid);
                        }
                    },
                    {
                        title: '操作',
                        width: 80,
                        render: (h, params) => {
                            return h('Dropdown', {
                                attrs: {
                                    placement: "bottom-start",
                                    trigger: "click"
                                },
                                style: {
                                    marginLeft: '5px'
                                },
                                on: {
                                    'on-click': (name) => {
                                        this.operate({ name, id: params.row._id, index: params.index, row: params.row })
                                    }
                                }
                            }, [
                                h('a', [
                                    h('Icon', {
                                        attrs: {
                                            size: '17',
                                            type: 'ios-more'
                                        }
                                    })
                                ]),
                                h('DropdownMenu', {
                                    slot: 'list'
                                }, [
                                    h('DropdownItem', {
                                        domProps: {
                                            innerHTML: '编辑'
                                        },
                                        attrs: {
                                            name: 'edit'
                                        }
                                    }),
                                    h('DropdownItem', {
                                        domProps: {
                                            innerHTML: '删除'
                                        },
                                        attrs: {
                                            name: 'delete'
                                        }
                                    })
                                ])
                            ])
                        }
                    }
                ]
            }
        },
        components: {
            'v-table': Table
        },
        methods: {
            operate(data) {
                const { name, id, index, row } = data
                if (name === 'delete') {
                    // this.delete({ id, index })
                } else if (name === 'edit') {
                    // this.$router.push({ name: 'demo_datail', params: { id: id} })
                }
            }
        }
    }
</script>
<style>

</style>
