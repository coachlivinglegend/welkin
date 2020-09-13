import './BlogPosts.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import * as filestack from 'filestack-js'
import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from 'react-dom'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { Editor, Transforms, createEditor, Range } from 'slate'
import { Slate, Editable, withReact, useSlate, useEditor, useSelected, useFocused } from 'slate-react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'
import { SpinnerBig } from '../../../components/Spinner/Spinner'
import PostPagePreview from '../../../components/PostPagePreview/PostPagePreview'

import { cx, css } from 'emotion'
const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }
  
const LIST_TYPES = ['numbered-list', 'bulleted-list']

const BlogPosts = ({ match }) => {
    
    const [filename, setFilename] = useState('')
    const [mimetype, setMimeType] = useState('')
    const [url, setUrl] = useState('')
    const [handle, setHandle] = useState('')
    const [postHeader, setPostHeader] = useState('')
    // const [postBody, setPostBody] = useState('')

    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withImages(withLinks(withHistory(withReact(createEditor())))), [])
    const [value, setValue] = useState(initialValue)
    const preSlug = postHeader.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") 
    const slug = (preSlug.replace(/[" "]/g, "-")).toLowerCase()

    const UPLOAD_POST = gql`
      mutation ($postBody: RichTextAST!){
        createBlog(data: {
          postTitle: "${postHeader}"
          slug: "${slug}"
          postPicture : {
            create: {
              handle: "${handle}"
              fileName: "${filename}"
              mimeType: "${mimetype}"
            }
          }
          postBody: $postBody
        }){
          id
          postTitle
          postPicture {
            id
            url
          }
          postBody {
            html
          }
        }
      }
    `
    const GET_ALLNEWS = gql`
    {
        blogs (orderBy: createdAt_DESC){
            id
            createdAt
            slug
            postTitle
          	postPicture {
                id
                url
            }
            postBody {
                html
            }
        }
    }
  `

  
  const handleUpload = () => {
    const client = filestack.init('APVtbrtiShOQCtyCSy3tAz');
    const options = {
        onUploadDone: function(file) {
            const { filesUploaded } = file
            const uploadedFile = filesUploaded[0]
            setFilename(uploadedFile.filename);
            setHandle(uploadedFile.handle);
            setMimeType(uploadedFile.mimetype)
            setUrl(uploadedFile.url)
        },
        accept: ["image/*"],
    }
    client.picker(options).open();
  }

    return (
        <div className="blogPostsWrap">
            BlogPosts
            <div className="blogPostsMainWrap">
                <div className="blogEditor">
                <div>
                    <input type="text" className="postEditTitle" name="description" placeholder="Enter the title of the post." onChange={(e) => setPostHeader(e.target.value)}/>
                    <button onClick={handleUpload} className="saveHeader postEditButton ">ADD A PICTURE</button>
                    <div className="homeImageMini" style={{backgroundImage: `url(${url})`, margin: "0 auto"}}/>
                </div>

                    <div className="slateEditor">
                        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                        <Toolbar>
                            <BlockButton sel="headsel" icon="format_size" />
                            <div className="headingFormatDefault">
                              <BlockButton format="heading-one" icon="looks_one" />
                              <BlockButton format="heading-two" icon="looks_two" />
                              <BlockButton format="heading-three" icon="looks_3" />
                              <BlockButton format="heading-four" icon="looks_4" />
                              <BlockButton format="heading-five" icon="looks_5" />
                              <BlockButton format="heading-six" icon="looks_6" />
                            </div>
                            <MarkButton format="bold" icon="format_bold" />
                            <MarkButton format="italic" icon="format_italic" />
                            <MarkButton format="underline" icon="format_underlined" />
                            <MarkButton format="code" icon="code" />
                            <LinkButton />
                            <InsertImageButton />
                            <BlockButton format="block-quote" icon="format_quote" />
                            <BlockButton format="numbered-list" icon="format_list_numbered" />
                            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                        </Toolbar>
                        <Editable 
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some text…"
                            spellCheck
                            autoFocus
                            onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                                }
                            }
                            }}
                        />
                        </Slate>
                    </div>
                    <Mutation mutation={UPLOAD_POST} 
                      variables={ 
                        { postBody :  { children : value } }
                      }>
                        {
                            ( uploadPost ) => (
                                <button
                                onClick={(e) => {
                                    const ast = value[0]
                                    e.preventDefault();
                                    // console.log(value[0])
                                    // console.log(editor)
                                    uploadPost()
                                    console.log(value)
                                    // console.log(initialValue)
                                    
                                }
                                }
                                className="saveHeader postEditButton">SAVE</button>
                            )
                        }
                    </Mutation>
                </div>
                <div className="postsPreview">
                  <Query query={GET_ALLNEWS}>
                      {
                          ({ loading, data }) => {
                              if (loading) return <SpinnerBig/>
                              return (
                                  data.blogs.map(({ id, createdAt, postTitle, slug, postPicture: { url }, postBody: { html }}) => {
                                      return (
                                          <PostPagePreview key={id} match={match} date={createdAt} slug={slug} title={postTitle} imageUrl={url} body={html}/>
                                      )
                                  })
                              )
                          }
                      }
                  </Query>
                </div>
            </div>
        </div>
    )
  }
  const toggleHead = () => {
    document.querySelector('.headingFormatDefault').classList.toggle('headingFormat')
  }
  
const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })
  
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
  
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }
  
  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    })
  
    return !!match
  }
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }
  
  const Element = ( props ) => {
    const { attributes, children, element } = props
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>  
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'link':
        return <a {...attributes} href={element.url}> {children} </a>
      case 'image':
        return <ImageElement {...props} />
      default:
        return <p {...attributes}>{children}</p>
    }
  }
  
  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }
  
  const BlockButton = ({ format, icon, sel }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
          if (sel === "headsel") {
            toggleHead()
          }
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }
  
  const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }
  
  const LinkButton = () => {
    const editor = useSlate()
    return (
      <Button
        active={isLinkActive(editor)}
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter the URL of the link:')
          if (!url) return
          insertLink(editor, url)
        }}
      >
        <Icon>link</Icon>
      </Button>
    )
  }

  const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
      <div {...attributes}>
        <div contentEditable={false}>
          <img
            src={element.url}
            className={css`
              display: block;
              max-width: 100%;
              max-height: 20em;
              box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
            `}
          />
        </div>
        {children}
      </div>
    )
  }

  const InsertImageButton = () => {
    const editor = useEditor()
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter the URL of the image:')
          if (!url) return
          insertImage(editor, url)
        }}
      >
        <Icon>image</Icon>
      </Button>
    )
  }

  const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
  }

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is not editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
    },
]

const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'rgb(102, 99, 253)'
                : 'rgb(98, 110, 153)'
              : active
              ? 'rgb(102, 99, 253)'
              : 'rgb(98, 110, 153)'
            }
          `
        )}
      />
    )
  )

const EditorValue = React.forwardRef(
    ({ className, value, ...props }, ref) => {
      const textLines = value.document.nodes
        .map(node => node.text)
        .toArray()
        .join('\n')
      return (
        <div
          ref={ref}
          {...props}
          className={cx(
            className,
            css`
              margin: 30px -20px 0;
            `
          )}
        >
          <div
            className={css`
              font-size: 14px;
              padding: 5px 20px;
              color: #404040;
              border-top: 2px solid #eeeeee;
              background: #f8f8f8;
            `}
          >
            Slate's value as text
          </div>
          <div
            className={css`
              color: #404040;
              font: 12px monospace;
              white-space: pre-wrap;
              padding: 10px 20px;
              div {
                margin: 0 0 0.5em;
              }
            `}
          >
            {textLines}
          </div>
        </div>
      )
    }
  )
  
const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  ))
  
const Instruction = React.forwardRef(({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  ))
  
const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > *:not(.headingFormatDefault) {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  ))
  
const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
  }
  
const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  ))

export default BlogPosts