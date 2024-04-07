import { Button } from 'antd'
import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

interface IProps {}

export const ExportAmount = ({ columns, data }: any) => {
  console.log(data)
  return (
    <div>
      <Button className="h-12">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      </Button>
      <table id="table-to-xls" className="hidden">
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
      </table>
    </div>
  )
}
