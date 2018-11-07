import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import { baseKeymap } from "prosemirror-commands"
import { DOMParser } from "prosemirror-model"


let state = EditorState.create({
  doc: DOMParser.fromSchema(schema).parse(content),
  plugins: [
    history(),
    keymap({ "Mod-z": undo, "Mod-y": redo }),
    keymap(baseKeymap),
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