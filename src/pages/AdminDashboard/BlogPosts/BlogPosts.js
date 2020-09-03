import './BlogPosts.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import * as filestack from 'filestack-js'
import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from 'react-dom'
import { Editor, Transforms, createEditor, Value } from 'slate'
import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'

import { cx, css } from 'emotion'
const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }
  
const LIST_TYPES = ['numbered-list', 'bulleted-list']


const BlogPosts = () => {

    // const serialize = node => {
    //     if (Text.isText(node)) {
    //         return escapeHtml(node.text)
    //     }
      
        
    //     const children = node.children.map(n => serialize(n)).join('')
      
    //     switch (node.type) {
    //       case 'quote':
    //         return `<blockquote><p>${children}</p></blockquote>`
    //       case 'paragraph':
    //         return `<p>${children}</p>`
    //       case 'link':
    //         return `<a href="${escapeHtml(node.url)}">${children}</a>`
    //       default:
    //         return children
    //     }
    // }

    const serialize = node => {
        let nodeText = escapeHtml(node.text);
        if (Text.isText(node)) {
          if (node["bold"]) {
            nodeText = `<strong>` + nodeText + `</strong>`;
          }
      
          if (node["italic"]) {
            nodeText = `<em>` + nodeText + `</em>`;
          }
      
          if (node["underlined"]) {
            nodeText = `<u>` + nodeText + `</u>`;
          }
          // Other marks should go here like above
          
          return nodeText;
        }
      
        if (Array.isArray(node)) {
          return node.map(subNode => serializeSubNode(subNode)).join("");
        }
      
        return serializeSubNode(node);
      };
      
      const serializeSubNode = node => {
        const children = node.children.map(n => serialize(n)).join("");
        switch (node.type) {
          case "link":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
          default:
            return `<p>${children}</p>`;
        }
      };

    
    const [filename, setFilename] = useState('')
    const [mimetype, setMimeType] = useState('')
    const [url, setUrl] = useState('')
    const [handle, setHandle] = useState('')
    const [postHeader, setPostHeader] = useState('')
    // const [postBody, setPostBody] = useState('')

    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [value, setValue] = useState(initialValue)
    
    // {
    //     blogs {
    //         id
    //         postTitle
    //       	postPicture {
    //           id
    //           url
    //         }
    //       postBody {
    //         raw
    //         html
    //         text
    //         markdown
    //       }
    //     }
    // }


    const UPLOAD_POST = gql`
        mutation {
            createBlog(data: {
            postTitle: "${postHeader}"
            postPicture : {
            create: {
                handle: "${handle}"
                fileName: "${filename}"
                mimeType: "${mimetype}"
            }
            }
            postBody: {
                html: "${serialize(value)}"
            }
        }){
            id
            postTitle
            postPicture {
            id
            url
            }
            postBody {
            raw
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
                    <input type="text" name="description" placeholder="Enter the title of the post." onChange={(e) => setPostHeader(e.target.value)}/>
                    <button onClick={handleUpload} className="saveHeader">ADD A PICTURE</button>
                    <div className="homeImageMini" style={{backgroundImage: `url(${url})`}}/>
                </div>

                    <div className="slateEditor">
                        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                        <Toolbar>
                            <MarkButton format="bold" icon="format_bold" />
                            <MarkButton format="italic" icon="format_italic" />
                            <MarkButton format="underline" icon="format_underlined" />
                            <MarkButton format="code" icon="code" />
                            <BlockButton format="heading-one" icon="looks_one" />
                            <BlockButton format="heading-two" icon="looks_two" />
                            <BlockButton format="block-quote" icon="format_quote" />
                            <BlockButton format="numbered-list" icon="format_list_numbered" />
                            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                        </Toolbar>
                        <Editable 
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
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
                    <Mutation mutation={UPLOAD_POST}>
                        {
                            ( uploadPost ) => (
                                <button
                                onClick={(e) => {
                                    const ast = value[0]
                                    e.preventDefault();
                                    // console.log(value[0])
                                    // console.log(editor)
                                    console.log(serialize(value))
                                    uploadPost()
                                    // console.log(value)
                                    
                                }
                                }
                                className="saveHeader">SAVE</button>
                            )
                        }
                    </Mutation>
                </div>
                <div className="postsPreview">
                    THIS IS WHERE A PREVIEW OF THE BLOGPOSTS WILL BE DISPLAYED
                    {/* <pre>{serializer.serialize(value)}</pre> */}
                </div>
            </div>
        </div>
    )
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
  
  const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
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
  
  const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
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
  
const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
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

const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
              ? 'black'
              : '#ccc'};
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
          & > * {
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

  const BLOCK_TAGS = {
    p: 'paragraph',
    a: 'link',
    li: 'list-item',
    ul: 'bulleted-list',
    ol: 'numbered-list',
    blockquote: 'quote',
    pre: 'code',
    h1: 'heading-one',
    h2: 'heading-two',
    h3: 'heading-three',
    h4: 'heading-four',
    h5: 'heading-five',
    h6: 'heading-six',
  };
  
  // Add a dictionary of mark tags.
  const MARK_TAGS = {
    strong: 'bold',
    em: 'italic',
    u: 'underlined',
    s: 'strikethrough',
    code: 'code',
    span: 'color',
  };
  
  const RULES = [
    {
      // Special case for links, to grab their href.
      deserialize(el, next) {
        if (el.tagName.toLowerCase() === 'a') {
          return {
            object: 'inline',
            type: 'link',
            nodes: next(el.childNodes),
            data: {
              href: el.getAttribute('href'),
            },
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === 'inline') {
          switch (obj.type) {
            case 'link':
              const { data } = obj;
              const href = data.get('href');
              return <a href={href}>{children}</a>;
            default:
              return <span>{children}</span>;
          }
        }
      },
    },
    {
      deserialize(el, next) {
        const type = BLOCK_TAGS[el.tagName.toLowerCase()];
  
        if (el.tagName.toLowerCase() === 'img') {
          return {
            object: 'block',
            type: 'image',
            nodes: next(el.childNodes),
            data: {
              src: el.getAttribute('src'),
            },
          };
        } else if (el.tagName.toLowerCase() === 'iframe') {
          return {
            object: 'block',
            type: 'video',
            nodes: next(el.childNodes),
            data: {
              video: el.getAttribute('src'),
            },
          };
        }
  
        if (type) {
          return {
            object: 'block',
            type: type,
            data: {
              className: el.getAttribute('class'),
              style: el.getAttribute('style'),
            },
            nodes: next(el.childNodes),
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === 'block') {
          switch (obj.type) {
            case 'heading-one':
              return <h1>{children}</h1>;
            case 'heading-two':
              return <h2>{children}</h2>;
            case 'align-left':
              console.log(obj);
              return <div style={{ textAlign: 'left' }}>{children}</div>;
            case 'align-center':
              return <div style={{ textAlign: 'center' }}>{children}</div>;
            case 'align-right':
              return <div style={{ textAlign: 'right' }}>{children}</div>;
            case 'align-justify':
              return <div style={{ textAlign: 'justify' }}>{children}</div>;
            case 'bulleted-list':
              return <ul>{children}</ul>;
            case 'numbered-list':
              return <ol>{children}</ol>;
            case 'list-item':
              return <li>{children}</li>;
            case 'image':
              const src = obj.data.get('src');
              return <img src={src} />;
            case 'video':
              const video = obj.data.get('video');
              return (
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="640"
                  height="360"
                  src={video}
                  frameBorder="0"
                />
              );
            case 'block-quote':
              return <blockquote>{children}</blockquote>;
            case 'code':
              return (
                <pre>
                  <code>{children}</code>
                </pre>
              );
            case 'paragraph':
              return <p className={obj.data.get('className')}>{children}</p>;
            case 'quote':
              return <blockquote>{children}</blockquote>;
          }
        }
      },
    },
    // Add a new rule that handles marks...
    {
      deserialize(el, next) {
        const type = MARK_TAGS[el.tagName.toLowerCase()];
        if (type) {
          return {
            object: 'mark',
            type: type,
            nodes: next(el.childNodes),
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === 'mark') {
          switch (obj.type) {
            case 'bold':
              return <strong>{children}</strong>;
            case 'italic':
              return <em>{children}</em>;
            case 'code':
              return <code>{children}</code>;
            case 'underlined':
              return <u>{children}</u>;
          }
        }
      },
    },
  ];
  
//   const serializer = new Html({ rules: RULES });
  


export default BlogPosts