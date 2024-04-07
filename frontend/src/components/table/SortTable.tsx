import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export const SortTable = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'index',
      sorter: (a, b) => a.index - b.index
    }
  ]

  return <Table columns={columns} dataSource={[]} />
}
