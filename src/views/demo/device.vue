<template>
    <Card>
        <p slot="title">设备列表：</p>
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
                url: '/api/device',
                originFetchData: {  // 列表的初始过滤条件
                    filter: {
                    }
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true
                    },
                    {
                        title: '名称',
                        key: 'name',
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
