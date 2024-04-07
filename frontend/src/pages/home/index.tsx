import { Button, Checkbox, Input } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'

import { ModalAddAmount } from './ModalAddAmount'
import { ModalAddMember } from './ModalAddMember'
import { formatCurrency } from 'utils'

export const Home = () => {
  const [users, setUsers] = useState<any[]>(
    JSON.parse(localStorage.getItem('users') ?? '[]')
  )
  const [dataAmount, setDataAmount] = useState<any[]>(
    JSON.parse(localStorage.getItem('dataAmount') ?? '[]')
  )
  const certificatePrint = useRef<HTMLDivElement>(null)

  const listUserId = users.map((user) => user.id)

  const columnsAmount: ColumnsType<any> = [
    {
      title: 'Mục chi',
      dataIndex: 'name',
      fixed: 'left',
      width: 100,
      render: (name: string, record) => {
        const nameUserPay = users.find((user) => user.id === record.userPay)
          ?.name
        return (
          <div>
            <p className="text-sm">{name}</p>
            <p className="text-[11px]">({nameUserPay})</p>
          </div>
        )
      }
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      width: 120,
      render: (amount: number) => {
        return (
          <p className="text-sm whitespace-nowrap">{formatCurrency(amount)}</p>
        )
      }
    }
  ]
  const columnsResult: ColumnsType<any> = [
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Tiền cọc',
      dataIndex: 'deposit',
      render: (deposit: number) => {
        return <p>{formatCurrency(deposit)}</p>
      }
    },
    {
      title: 'Đóng thêm',
      dataIndex: 'needToPay',
      render: (needToPay: number) => {
        return <p>{formatCurrency(needToPay)}</p>
      }
    }
  ]

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('dataAmount', JSON.stringify(dataAmount))
  }, [dataAmount])

  users.forEach((user, index) => {
    columnsAmount.push({
      title: <p className="whitespace-nowrap">{user.name}</p>,
      dataIndex: 'users',
      render: (_users: string[], record) => {
        const isUserExist = _users.includes(user.id)
        const amountOfUser = isUserExist ? record.amount / _users.length : 0
        return (
          <div className="flex items-start flex-col gap-2">
            <Checkbox
              checked={isUserExist}
              onChange={(e) => {
                if (e.target.checked) {
                  record.users.push(user.id)
                } else {
                  record.users = record.users.filter(
                    (item: string) => item !== user.id
                  )
                }
                setDataAmount((p) => {
                  const index = p.findIndex((item) => item.id === record.id)
                  p[index] = record
                  return [...p]
                })
              }}
            />
            <p className="text-xs">{formatCurrency(amountOfUser)}</p>
          </div>
        )
      }
    })
  })

  const dataResult = users.map((user) => {
    const needToPay =
      dataAmount.length > 0
        ? dataAmount.reduce((acc, cur) => {
            const isUserExist = cur.users.includes(user.id)
            const isUserPay = cur.userPay === user.id
            const amountOfUser = isUserExist ? cur.amount / cur.users.length : 0
            return acc + amountOfUser - Number(isUserPay ? cur.amount : 0)
          }, 0) - user.deposit
        : 0
    return {
      id: user.id,
      name: user.name,
      deposit: user.deposit,
      needToPay
    }
  })

  const clearData = () => {
    localStorage.removeItem('users')
    localStorage.removeItem('dataAmount')
    setUsers([])
    setDataAmount([])
  }

  return (
    <div className="sm:p-8 p-3">
      <div className="flex items-start justify-between">
        <ModalAddMember setUsers={setUsers} users={users} />
        {users.length > 0 && (
          <Button className="h-12" onClick={clearData}>
            Xoá dữ liệu
          </Button>
        )}
      </div>
      {users.length > 0 && (
        <div ref={certificatePrint}>
          <div className="my-5">
            <Table
              scroll={{ x: 800 }}
              columns={columnsAmount}
              dataSource={dataAmount}
              pagination={false}
            />
            <p className="text-xs mt-2 text-right">
              Lưu ý: vuốt sang để xem thêm các thành viên!
            </p>
          </div>
          <div className="flex items-center justify-between">
            <ModalAddAmount
              users={users}
              onAddAmount={(data) => {
                setDataAmount((p) => [
                  ...p,
                  {
                    ...data,
                    users: listUserId
                  }
                ])
              }}
            />
          </div>
          <div className="mt-6 xl:w-1/3 mx-auto sm:w-1/2">
            <p className="bg-gray-200 p-2 rounded-md text-center">Kết quả</p>
            <Table
              columns={columnsResult}
              dataSource={dataResult}
              className="my-5 "
              pagination={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
