import { FC } from "react"

const Output = dynamic(async () => await import("editorjs-react-renderer"))

interface EditorOutputProps {}

const EditorOutput: FC<EditorOutputProps> = ({}) => {
  return <div>EditorOutput</div>
}

export default EditorOutput
