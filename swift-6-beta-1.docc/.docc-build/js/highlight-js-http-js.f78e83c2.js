/*!
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */
(self["webpackChunkswift_docc_render"]=self["webpackChunkswift_docc_render"]||[]).push([[878],{8937:function(e){function n(e){const n=e.regex,a="HTTP/(2|1\\.[01])",s=/[A-Za-z][A-Za-z0-9-]*/,t={className:"attribute",begin:n.concat("^",s,"(?=\\:\\s)"),starts:{contains:[{className:"punctuation",begin:/: /,relevance:0,starts:{end:"$",relevance:0}}]}},i=[t,{begin:"\\n\\n",starts:{subLanguage:[],endsWithParent:!0}}];return{name:"HTTP",aliases:["https"],illegal:/\S/,contains:[{begin:"^(?="+a+" \\d{3})",end:/$/,contains:[{className:"meta",begin:a},{className:"number",begin:"\\b\\d{3}\\b"}],starts:{end:/\b\B/,illegal:/\S/,contains:i}},{begin:"(?=^[A-Z]+ (.*?) "+a+"$)",end:/$/,contains:[{className:"string",begin:" ",end:" ",excludeBegin:!0,excludeEnd:!0},{className:"meta",begin:a},{className:"keyword",begin:"[A-Z]+"}],starts:{end:/\b\B/,illegal:/\S/,contains:i}},e.inherit(t,{relevance:0})]}}e.exports=n}}]);