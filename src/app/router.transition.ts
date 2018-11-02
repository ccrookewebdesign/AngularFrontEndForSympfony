import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence,
  state
} from '@angular/animations';

export const slideOutLeft = [
  style({transform: 'translate3d(0, 0, 0)', offset: 0}),
  style({transform: 'translate3d(-150%, 0, 0)', opacity: 0, offset: 1}),
]

export const slideOutRight = [
  style({transform: 'translate3d(0, 0, 0)', offset: 0}),
  style({transform: 'translate3d(+150%, 0, 0)', opacity: 0, offset: 1}),
]

export const fade = [
  trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    transition('* <=> *', [
      animate(300)
    ])
  ])
];

export const ANM_ROUTE_ENTER = 'route-enter-staggered';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
      optional: true
    }),
    query(':enter .' + ANM_ROUTE_ENTER, style({ opacity: 0 }), {
      optional: true
    }),
    sequence([
      query(
        ':leave > *',
        [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'translateY(-3%)', opacity: 0 })
          ),
          style({ position: 'fixed' })
        ],
        { optional: true }
      ),
      query(
        ':enter > *',
        [
          style({
            transform: 'translateY(-3%)',
            opacity: 0,
            position: 'static'
          }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'translateY(0%)', opacity: 1 })
          )
        ],
        { optional: true }
      )
    ]),
    query(
      ':enter .' + ANM_ROUTE_ENTER,
      stagger(40, [
        style({ transform: 'translateY(15%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ]),
      { optional: true }
    )
  ])
]);
