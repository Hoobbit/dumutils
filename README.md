# dumutils

my util

### Arrange Array

```
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

const compare = (oldObj: any, newObj: any) => {
  return oldObj.id == newObj.id
}

const { add, remove } = arrangeObjArray(fromObjArray, toObjArray, compare)
// add: [ { id: 'nr002' }, { id: 'nr003' }, { id: 'nr004' } ]
// remove: [ { id: 'or000' }, { id: 'or002' }, { id: 'or003' } ]

```

### Left Join Two Array

```
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
],

const results = leftJoin(
  leftArray,
  rightArray,
  [
    { leftField: 'id', rightField: 'id' },
    { leftField: 'date', rightField: 'date' }
  ],
  ['id', 'desc']
)

// // results
[
  { id: 'or000', date: '2022', name: 'name-000', desc: null },
  { id: 'or001', date: '2021', name: 'name-001', desc: 'bye' },
  { id: 'or002', date: '2020', name: 'name-002', desc: null },
  { id: 'or003', date: '2019', name: 'name-003', desc: null },
  { id: 'or004', date: '2018', name: 'name-003', desc: 'hello~~' },
  { id: 'or004', date: '2018', name: 'name-003', desc: 'byeworld~~' }
]
```

### Inner Join Two Array

```
innerJoin(array1, array2, [
  { leftField: 'id', rightField: 'id' },
  { leftField: 'date', rightField: 'date' }
])
```
