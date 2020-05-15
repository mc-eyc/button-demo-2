const defaultState = [
  {title: "credit", id: "credit", value: 0},
  {title: "bet", id: "bet", value: 9999999},
  {title: "win", id: "win", value: 9999999},
];

export default function(state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
