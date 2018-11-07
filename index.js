import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"

let state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({ "Mod-z": undo, "Mod-y": redo })
  ]
})
let view = new EditorView(document.querySelector('#editor'), {
  state,
  dispatchTransaction (transaction) {
    console.log(
      "Document size went from", transaction.before.content.size,
      "to", transaction.doc.content.size
    )
    let newState = view.state.apply(transaction)
    view.updateState(newState)
  }
})