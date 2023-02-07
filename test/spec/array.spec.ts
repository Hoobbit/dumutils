import { expect } from 'chai'
import {
  arrangeObjArray,
  buildNameValueObjectArray,
  innerJoin,
  leftJoin,
  subJoin,
  subJoinByRelFunc
} from '../../src/array'

const twoDeepthCompare = function (oldObj: any, newObj: any) {
  return oldObj.role.id == newObj.role.id
}

describe('arrangeObjArrayTest', function () {
  it(`arrange array(with default compare function)`, () => {
    const fromObjArray = [
      { id: 'or000' },
      { id: 'or001' },
      { id: 'or002' },
      { id: 'or003' }
    ]

    const toObjArray = [
      { id: 'nr002' },
      { id: 'or001' },
      { id: 'nr003' },
      { id: 'nr004' }
    ]

    const { add, remove } = arrangeObjArray(fromObjArray, toObjArray)

    // add: [{ id: 'nr002' }, { id: 'nr003' }, { id: 'nr004' }]
    // remove: [ { id: 'or000' }, { id: 'or002' }, { id: 'or003' } ]

    expect(add.length).to.equal(3)
    const addedIds = ['nr002', 'nr003', 'nr004']
    add.forEach((obj) => {
      expect(addedIds.includes(obj.id)).to.equal(
        true,
        'Add array does not correct!!!'
      )
    })

    expect(remove.length).to.equal(3)
    const removedIds = ['or000', 'or002', 'or003']
    remove.forEach((obj) => {
      expect(removedIds.includes(obj.id)).to.equal(
        true,
        'Remove array does not correct!!!'
      )
    })
  })

  it(`arrange 2deepth array(with custom compare function)`, () => {
    const fromObjArray = [
      { role: { id: 'or001' } },
      { role: { id: 'or002' } },
      { role: { id: 'or003' } }
    ]

    const toObjArray = [
      { role: { id: 'nr002' } },
      { role: { id: 'or001' } },
      { role: { id: 'nr003' } },
      { role: { id: 'nr004' } }
    ]

    const { add, remove } = arrangeObjArray(
      fromObjArray,
      toObjArray,
      twoDeepthCompare
    )

    expect(add.length).to.equal(3)

    const addedIds = ['nr002', 'nr003', 'nr004']
    add.forEach((obj) => {
      expect(addedIds.includes(obj.role.id)).to.equal(
        true,
        'Add array does not correct!!!'
      )
    })

    expect(remove.length).to.equal(2)
    const removedIds = ['or002', 'or003']
    remove.forEach((obj) => {
      expect(removedIds.includes(obj.role.id)).to.equal(
        true,
        'Remove array does not correct!!!'
      )
    })
  })
})

describe('leftJoinArrayTest', function () {
  it(`1. left join two array(one by one case, one relation field)`, () => {
    const leftArray = [
      { id: 'or000', name: 'name-000' },
      { id: 'or001', name: 'name-001' },
      { id: 'or002', name: 'name-002' },
      { id: 'or003', name: 'name-003' }
    ]

    const rightArray = [
      { id: 'nr002', desc: 'hello' },
      { id: 'or001', desc: 'bye' },
      { id: 'nr003', desc: 'hello' },
      { id: 'nr004', desc: 'bye' }
    ]

    const results = leftJoin(
      leftArray,
      rightArray,
      [{ leftField: 'id', rightField: 'id' }],
      true,
      ['id', 'desc']
    )

    expect(results.length).to.equal(4)
  })

  it(`2. left join two array(one by many case, one relation field)`, () => {
    const leftArray = [
      { id: 'or000', name: 'name-000' },
      { id: 'or001', name: 'name-001' },
      { id: 'or002', name: 'name-002' },
      { id: 'or003', name: 'name-003' }
    ]

    const rightArray = [
      { idd: 'nr002', desc: 'hello' },
      { idd: 'or001', desc: 'bye' },
      { idd: 'or001', desc: 'hello' },
      { idd: 'or002', desc: 'bye' }
    ]

    const results = leftJoin(
      leftArray,
      rightArray,
      [{ leftField: 'id', rightField: 'idd' }],
      true,
      ['id', 'desc']
    )

    expect(results.length).to.equal(5)
  })

  it(`3. left join two array(one by many case, multi relation fields)`, () => {
    const leftArray = [
      { id: 'or000', date: '2022', name: 'name-000' },
      { id: 'or001', date: '2021', name: 'name-001' },
      { id: 'or002', date: '2020', name: 'name-002' },
      { id: 'or003', date: '2019', name: 'name-003' },
      { id: 'or004', date: '2018', name: 'name-003' }
    ]

    const rightArray = [
      { id: 'nr002', date: '2022', desc: 'hello' },
      { id: 'or001', date: '2021', desc: 'bye' },
      { id: 'or001', date: '2020', desc: 'hello' },
      { id: 'or002', date: '2019', desc: 'bye' },
      { id: 'or004', date: '2018', desc: 'hello~~' },
      { id: 'or004', date: '2018', desc: 'byeworld~~' }
    ]

    const results = leftJoin(
      leftArray,
      rightArray,
      [
        { leftField: 'id', rightField: 'id' },
        { leftField: 'date', rightField: 'date' }
      ],
      true,
      ['id', 'desc']
    )

    const results2 = leftJoin(
      leftArray,
      rightArray,
      [
        { leftField: 'id', rightField: 'id' },
        { leftField: 'date', rightField: 'date' }
      ],
      true
    )

    // results
    const checkResults = [
      { id: 'or000', date: '2022', name: 'name-000', desc: null },
      { id: 'or001', date: '2021', name: 'name-001', desc: 'bye' },
      { id: 'or002', date: '2020', name: 'name-002', desc: null },
      { id: 'or003', date: '2019', name: 'name-003', desc: null },
      { id: 'or004', date: '2018', name: 'name-003', desc: 'hello~~' },
      { id: 'or004', date: '2018', name: 'name-003', desc: 'byeworld~~' }
    ]

    // console.log('results: ', results)
    expect(results.length).to.equal(6)
    // console.log('results2: ', results2)
    expect(results2.length).to.equal(6)
  })
})

describe('innerJoinArrayTest', function () {
  it(`1. inner join two array(one by many case, multi relation fields)`, () => {
    const leftArray = [
      { id: 'or000', date: '2022', name: 'name-000' },
      { id: 'or001', date: '2021', name: 'name-001' },
      { id: 'or002', date: '2020', name: 'name-002' },
      { id: 'or003', date: '2019', name: 'name-003' },
      { id: 'or004', date: '2018', name: 'name-003' }
    ]

    const rightArray = [
      { id: 'nr002', date: '2022', desc: 'hello' },
      { id: 'or001', date: '2021', desc: 'bye' },
      { id: 'or001', date: '2020', desc: 'hello' },
      { id: 'or002', date: '2019', desc: 'bye' },
      { id: 'or004', date: '2018', desc: 'helloworld~~' },
      { id: 'or004', date: '2018', desc: 'byeworld~~' }
    ]

    const results = innerJoin(leftArray, rightArray, [
      { leftField: 'id', rightField: 'id' },
      { leftField: 'date', rightField: 'date' }
    ])

    expect(results.length).to.equal(3)
  })
})

describe('subJoinArrayTest', function () {
  it(`1. sub join two array(one by many case, multi relation fields)`, () => {
    const mainArray = [
      { id: 'or000', date: '2022', name: 'name-000' },
      { id: 'or001', date: '2021', name: 'name-001' },
      { id: 'or002', date: '2020', name: 'name-002' },
      { id: 'or003', date: '2019', name: 'name-003' },
      { id: 'or004', date: '2018', name: 'name-003' }
    ]

    const subArray = [
      { id: 'nr002', date: '2022', desc: 'hello' },
      { id: 'or001', date: '2021', desc: 'bye' },
      { id: 'or001', date: '2020', desc: 'hello' },
      { id: 'or002', date: '2019', desc: 'bye' },
      { id: 'or004', date: '2018', desc: 'helloworld~~' },
      { id: 'or004', date: '2018', desc: 'byeworld~~' }
    ]

    const results = subJoin(mainArray, subArray, [
      { leftField: 'id', rightField: 'id' },
      { leftField: 'date', rightField: 'date' }
    ])

    const checkResults = [
      { id: 'or000', date: '2022', name: 'name-000', children: [] },
      {
        id: 'or001',
        date: '2021',
        name: 'name-001',
        children: [{ id: 'or001', date: '2021', desc: 'bye' }]
      },
      { id: 'or002', date: '2020', name: 'name-002', children: [] },
      { id: 'or003', date: '2019', name: 'name-003', children: [] },
      {
        id: 'or004',
        date: '2018',
        name: 'name-003',
        children: [
          { id: 'or004', date: '2018', desc: 'helloworld~~' },
          { id: 'or004', date: '2018', desc: 'byeworld~~' }
        ]
      }
    ]

    expect(results.length).to.equal(checkResults.length)
    expect(results[4].children.length).to.equal(checkResults[4].children.length)
    expect(results[4].children[1].desc).to.equal(
      checkResults[4].children[1].desc
    )
  })
})

describe('subJoinByRelFuncArrayTest', function () {
  it(`1. sub join two array by relation function(one by many case, multi relation fields)`, () => {
    const mainArray = [
      { id: 'or000', date: '2022', subObj: { name: 'name-000' } },
      { id: 'or001', date: '2021', subObj: { name: 'name-001' } },
      { id: 'or002', date: '2020', subObj: { name: 'name-002' } },
      { id: 'or003', date: '2019', subObj: { name: 'name-003' } },
      { id: 'or004', date: '2018', subObj: { name: 'name-003' } }
    ]

    const subArray = [
      {
        id: 'nr002',
        date: '2022',
        desc: 'hello',
        subObj: { name: 'name-000' }
      },
      {
        id: 'or001',
        date: '2021',
        desc: 'bye',
        subObj: { name: 'name-003' }
      },
      {
        id: 'or001',
        date: '2020',
        desc: 'hello',
        subObj: { name: 'name-003' }
      },
      {
        id: 'or002',
        date: '2019',
        desc: 'bye',
        subObj: { name: 'name-002' }
      },
      {
        id: 'or004',
        date: '2018',
        desc: 'helloworld~~',
        subObj: { name: 'name-000' }
      },
      {
        id: 'or004',
        date: '2018',
        desc: 'byeworld~~',
        subObj: { name: 'name-000' }
      }
    ]

    const relFunc = (mainRow: any, subRow: any) => {
      return mainRow.subObj.name === subRow.subObj.name
    }

    const results = subJoinByRelFunc(
      mainArray,
      subArray,
      relFunc,
      'subItems',
      true
    )

    const checkResults = [
      {
        id: 'or000',
        date: '2022',
        subObj: { name: 'name-000' },
        subItems: [
          {
            id: 'nr002',
            date: '2022',
            desc: 'hello',
            subObj: { name: 'name-000' }
          },
          {
            id: 'or004',
            date: '2018',
            desc: 'helloworld~~',
            subObj: { name: 'name-000' }
          },
          {
            id: 'or004',
            date: '2018',
            desc: 'byeworld~~',
            subObj: { name: 'name-000' }
          }
        ]
      },
      {
        id: 'or001',
        date: '2021',
        subObj: { name: 'name-001' },
        subItems: []
      },
      {
        id: 'or002',
        date: '2020',
        subObj: { name: 'name-002' },
        subItems: [
          {
            id: 'or002',
            date: '2019',
            desc: 'bye',
            subObj: { name: 'name-002' }
          }
        ]
      },
      {
        id: 'or003',
        date: '2019',
        subObj: { name: 'name-003' },
        subItems: [
          {
            id: 'or001',
            date: '2021',
            desc: 'bye',
            subObj: { name: 'name-003' }
          },
          {
            id: 'or001',
            date: '2020',
            desc: 'hello',
            subObj: { name: 'name-003' }
          }
        ]
      },
      {
        id: 'or004',
        date: '2018',
        subObj: { name: 'name-003' },
        subItems: [
          {
            id: 'or001',
            date: '2021',
            desc: 'bye',
            subObj: { name: 'name-003' }
          },
          {
            id: 'or001',
            date: '2020',
            desc: 'hello',
            subObj: { name: 'name-003' }
          }
        ]
      }
    ]

    expect(results.length).to.equal(checkResults.length)

    // console.log(results)
    expect(results[4].subItems.length).to.equal(checkResults[4].subItems.length)
    expect(results[1].subItems.length).to.equal(checkResults[1].subItems.length)
  })
})

describe('buildNameValueObjectArrayTest', function () {
  it(`1. change one row array to name, value Object array`, () => {
    const data = [{ id: 'or000', date: '2022', name: 'name-000' }]
    const results = buildNameValueObjectArray(data)

    expect(results.length).to.equal(3)
    expect(results[1].name).to.equal('date')
    expect(results[2].value).to.equal('name-000')
  }),
    it(`1. change one object to name, value Object array`, () => {
      const data = { id: 'or000', date: '2022', name: 'name-000' }
      const results = buildNameValueObjectArray(data)

      expect(results.length).to.equal(3)
      expect(results[1].name).to.equal('date')
      expect(results[2].value).to.equal('name-000')
    })
})
