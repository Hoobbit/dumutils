import { expect } from 'chai'
import { dataColExtend, dataColFlatExtend } from '../../src/dimention'

describe('extendL1Test', function () {
  it(`第一行横向扩展`, () => {
    const fromObjArray = [
      {
        date: '2022-01-01',
        matType: 'PC',
        planQty: 655,
        doneQty: 655
      },
      {
        date: '2022-01-01',
        matType: 'PHONE',
        planQty: 828,
        doneQty: 828
      },
      {
        date: '2022-01-01',
        matType: 'TABLET',
        planQty: 255,
        doneQty: 255
      },
      {
        date: '2022-01-02',
        matType: 'PC',
        planQty: 630,
        doneQty: 630
      },
      {
        date: '2022-01-02',
        matType: 'PHONE',
        planQty: 755,
        doneQty: 755
      },
      {
        date: '2022-01-02',
        matType: 'TABLET',
        planQty: 265,
        doneQty: 265
      },
      {
        date: '2022-01-03',
        matType: 'PC',
        planQty: 275,
        doneQty: 275
      },
      {
        date: '2022-01-03',
        matType: 'PHONE',
        planQty: 725,
        doneQty: 725
      },
      {
        date: '2022-01-03',
        matType: 'TABLET',
        planQty: 275,
        doneQty: 275
      }
    ]

    // 数据
    const toObjArray = [
      {
        matType: 'PC',
        '2022-01-01_doneQty': 655,
        '2022-01-01_planQty': 655,
        '2022-01-02_doneQty': 630,
        '2022-01-02_planQty': 630,
        '2022-01-03_doneQty': 275,
        '2022-01-03_planQty': 275
      },
      {
        matType: 'PHONE',
        '2022-01-01_doneQty': 828,
        '2022-01-01_planQty': 828,
        '2022-01-02_doneQty': 755,
        '2022-01-02_planQty': 755,
        '2022-01-03_doneQty': 725,
        '2022-01-03_planQty': 725
      },
      {
        matType: 'TABLET',
        '2022-01-01_doneQty': 255,
        '2022-01-01_planQty': 255,
        '2022-01-02_doneQty': 265,
        '2022-01-02_planQty': 265,
        '2022-01-03_doneQty': 275,
        '2022-01-03_planQty': 275
      }
    ]

    const resultArray = dataColExtend(fromObjArray, ['matType'], 'L1', 'date', [
      'planQty',
      'doneQty'
    ])

    expect(resultArray.length, 'size does not match').equal(3)

    expect(JSON.stringify(resultArray[0]), `row does not match: ${0}`).to.equal(
      JSON.stringify(toObjArray[0])
    )
  })
})

describe('extendL2Test', function () {
  it(`第二行横向扩展`, () => {
    const fromObjArray = [
      {
        date: new Date('2022-01-01'),
        matType: 'PC',
        planQty: 655,
        doneQty: 655
      },
      {
        date: new Date('2022-01-01'),
        matType: 'PHONE',
        planQty: 828,
        doneQty: 828
      },
      {
        date: new Date('2022-01-01'),
        matType: 'TABLET',
        planQty: 255,
        doneQty: 255
      },
      {
        date: new Date('2022-01-02'),
        matType: 'PC',
        planQty: 630,
        doneQty: 630
      },
      {
        date: new Date('2022-01-02'),
        matType: 'PHONE',
        planQty: 755,
        doneQty: 755
      },
      {
        date: new Date('2022-01-02'),
        matType: 'TABLET',
        planQty: 265,
        doneQty: 265
      },
      {
        date: new Date('2022-01-03'),
        matType: 'PC',
        planQty: 275,
        doneQty: 275
      },
      {
        date: new Date('2022-01-03'),
        matType: 'PHONE',
        planQty: 725,
        doneQty: 725
      },
      {
        date: new Date('2022-01-03'),
        matType: 'TABLET',
        planQty: 275,
        doneQty: 275
      }
    ]

    // 数据
    const toObjArray = [
      {
        date: '2022-01-01',
        planQty_TABLET: 255,
        planQty_PHONE: 828,
        planQty_PC: 655,
        doneQty_TABLET: 255,
        doneQty_PHONE: 828,
        doneQty_PC: 655
      },
      {
        date: '2022-01-02',
        planQty_TABLET: 265,
        planQty_PHONE: 755,
        planQty_PC: 630,
        doneQty_TABLET: 265,
        doneQty_PHONE: 755,
        doneQty_PC: 630
      },
      {
        date: '2022-01-03',
        planQty_TABLET: 275,
        planQty_PHONE: 725,
        planQty_PC: 275,
        doneQty_TABLET: 275,
        doneQty_PHONE: 725,
        doneQty_PC: 275
      }
    ]

    const errorObjArray = [
      {
        date: '2022-01-01',
        planQty1_TABLET: 255, // error
        planQty_PHONE: 828,
        planQty_PC: 655,
        doneQty_TABLET: 255,
        doneQty_PHONE: 828,
        doneQty_PC: 655
      },
      {
        date: '2022-01-02',
        planQty_TABLET: 265,
        planQty_PHONE: -1, // error
        planQty_PC: 630,
        doneQty_TABLET: 265,
        doneQty_PHONE: 755,
        doneQty_PC: 630
      }
    ]

    const resultArray = dataColExtend(fromObjArray, ['date'], 'L2', 'matType', [
      'planQty',
      'doneQty'
    ])

    expect(resultArray.length, 'size does not match').equal(3)
    for (let i = 0; i++; i < resultArray.length) {
      expect(
        JSON.stringify(resultArray[i]),
        `row does not match: ${i}`
      ).to.equal(JSON.stringify(toObjArray[i]))
    }

    expect(
      JSON.stringify(resultArray[0]),
      `row does not match: 0`
    ).to.not.equal(JSON.stringify(errorObjArray[0]))

    expect(
      JSON.stringify(resultArray[1]),
      `row does not match: 1`
    ).to.not.equal(JSON.stringify(errorObjArray[1]))
  })
})

describe('flatExtendTest', function () {
  const fromObjArray = [
    {
      matType: 'PC',
      matCode: 'PC001',
      planQty: 355,
      doneQty: 355
    },
    {
      matType: 'PC',
      matCode: 'PC001',
      planQty: 630,
      doneQty: 630
    },
    {
      matType: 'PC',
      matCode: 'PC002',
      planQty: 275,
      doneQty: 275
    },
    {
      matType: 'PC',
      matCode: 'PC002',
      planQty: 123,
      doneQty: 123
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE001',
      planQty: 828,
      doneQty: 828
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE001',
      planQty: 755,
      doneQty: 755
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE002',
      planQty: 756,
      doneQty: 756
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE002',
      planQty: 851,
      doneQty: 851
    }
  ]

  // 数据
  const toSeqObjArray = [
    {
      matType: 'PC',
      matCode: 'PC001',
      planQty_1: 355,
      doneQty_1: 355,
      planQty_2: 630,
      doneQty_2: 630
    },
    {
      matType: 'PC',
      matCode: 'PC002',
      planQty_1: 275,
      doneQty_1: 275,
      planQty_2: 123,
      doneQty_2: 123
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE001',
      planQty_1: 828,
      doneQty_1: 828,
      planQty_2: 755,
      doneQty_2: 755
    },
    {
      matType: 'PHONE',
      matCode: 'PHONE002',
      planQty_1: 756,
      doneQty_1: 756,
      planQty_2: 851,
      doneQty_2: 851
    }
  ]

  // const toChunkObjArray = [
  //   {
  //     matType: 'PC',
  //     matCode: 'PC001',
  //     planQty_1: 355,
  //     planQty_2: 630,
  //     doneQty_1: 355,
  //     doneQty_2: 630
  //   },
  //   {
  //     matType: 'PC',
  //     matCode: 'PC002',
  //     planQty_1: 275,
  //     planQty_2: 123,
  //     doneQty_1: 275,
  //     doneQty_2: 123
  //   },
  //   {
  //     matType: 'PHONE',
  //     matCode: 'PHONE001',
  //     planQty_1: 828,
  //     planQty_2: 755,
  //     doneQty_1: 828,
  //     doneQty_2: 755
  //   },
  //   {
  //     matType: 'PHONE',
  //     matCode: 'PHONE002',
  //     planQty_1: 756,
  //     planQty_2: 851,
  //     doneQty_1: 756,
  //     doneQty_2: 851
  //   }
  // ]

  it(`单层横向扩展: sequential`, () => {
    const resultArray = dataColFlatExtend(
      fromObjArray,
      ['matType', 'matCode'],
      ['planQty', 'doneQty']
    )

    expect(resultArray.length, 'size does not match').equal(4)
    expect(JSON.stringify(resultArray[0]), `row does not match: 0`).to.equal(
      JSON.stringify(toSeqObjArray[0])
    )
  })

  // it(`单层横向扩展: chunked`, () => {
  //   const resultArray = dataColFlatExtend(
  //     fromObjArray,
  //     ['matType', 'matCode'],
  //     ['planQty', 'doneQty']
  //   )

  //   expect(resultArray.length, 'size does not match').equal(4)
  //   expect(JSON.stringify(resultArray[0]), `row does not match: 0`).to.equal(
  //     JSON.stringify(toChunkObjArray[0])
  //   )
  // })
})
