import { Button, Checkbox } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useEffect, useMemo, useRef, useState } from 'react'

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

  const [amountEdit, setAmountEdit] = useState()

  const certificatePrint = useRef<HTMLDivElement>(null)

  const listUserId = users.map((user) => user.id)

  const columnsAmount: ColumnsType<any> = [
    {
      title: 'Mục chi',
      dataIndex: 'name',
      align: 'center',
      fixed: 'left',
      width: 90,
      render: (name: string, record) => {
        const nameUserPay = users.find((user) => user.id === record.userPay)
          ?.name
        return (
          <div onClick={() => setAmountEdit(record)}>
            <p className="text-sm">{name}</p>
            <p className="text-[11px]">({nameUserPay})</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
        )
      }
    },
    {
      title: 'Số tiền',
      fixed: 'left',
      align: 'center',
      dataIndex: 'amount',
      width: 100,
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
    },
    {
      dataIndex: 'paid',
      render: (paid, user) => {
        return (
          <Checkbox
            checked={paid}
            onChange={(e) => {
              const index = users.findIndex((i) => i.id === user.id)
              const newUsers = [...users]
              newUsers[index].paid = e.target.checked
              setUsers(newUsers)
            }}
          />
        )
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
      title: <p className="text-center">{user.name}</p>,
      dataIndex: 'users',
      width: 70,
      render: (_users: string[], record) => {
        const isUserExist = _users.includes(user.id)
        const amountOfUser = isUserExist ? record.amount / _users.length : 0
        return (
          <div className="flex items-center flex-col gap-2">
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
            <p className="text-[10px]">{formatCurrency(amountOfUser)}</p>
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
      needToPay,
      paid: user.paid
    }
  })

  const clearData = () => {
    localStorage.removeItem('users')
    localStorage.removeItem('dataAmount')
    setUsers([])
    setDataAmount([])
  }

  const totalUsersPaid = useMemo(() => {
    return users.reduce((accumulator, user) => {
      if (user.paid === true) {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0)
  }, [users])

  return (
    <div className="sm:p-8 p-3">
      <div className="flex">
        <ModalAddMember setUsers={setUsers} users={users} />
      </div>
      {users.length > 0 && (
        <div ref={certificatePrint}>
          <div className="my-5">
            <Table
              scroll={{ x: 1200 }}
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
              onEditAmount={(data) => {
                const { id } = data
                const index = dataAmount.findIndex((i) => i.id === id)
                const newData = [...dataAmount]
                newData[index] = data
                setDataAmount(newData)
              }}
              dataEdit={amountEdit}
              onClose={() => setAmountEdit(undefined)}
            />
          </div>
          <div className="mt-6 xl:w-1/3 mx-auto sm:w-1/2">
            <p className="bg-gray-200 p-2 rounded-md text-center">
              Kết quả ({totalUsersPaid} / {users.length} Đã đóng)
            </p>
            <Table
              columns={columnsResult}
              dataSource={dataResult}
              className="my-5 "
              pagination={false}
            />
          </div>
        </div>
      )}
      {users.length > 0 && (
        <Button
          className="h-12 w-full bg-red-500 text-white text-xl"
          onClick={clearData}
        >
          Xoá dữ liệu
        </Button>
      )}
    </div>
  )
}
