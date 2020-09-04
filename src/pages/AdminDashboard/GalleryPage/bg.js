// import React from 'react';
import './GalleryPage.css'

import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from 'react-dom'
import { Editor, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'

// import { Button, Icon, Toolbar } from '../components'
import { cx, css } from 'emotion'
const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }
  
const LIST_TYPES = ['numbered-list', 'bulleted-list']

  
const GalleryPage = () => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [value, setValue] = useState(initialValue)


    return (
        <div>
            Gallery
            <div>
              <div dangerouslySetInnerHTML={{__html: "<p>It was on this day, that <strong>Welkin</strong> showed the world that they have well and truly <em>arrived</em>.</p><p>Itamah was the star of the show.</p><img src=\"https://media.graphcms.com/output=format:jpg/resize=height:500,width:500/FvdDwsbAQ2iAaGwvCr3B\" alt=\"20190625_141527.jpg\" title=\"20190625_141527.jpg\" width=\"500\" height=\"500\" /><p></p>"}} />
            </div>
            GalleryPage
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

export default GalleryPage