import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefixCls", "className", "source", "style", "disableCopy", "skipHtml", "onScroll", "onMouseOver", "pluginsFilter", "rehypeRewrite", "wrapperElement", "warpperElement"];
import React, { useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypeAttrs from 'rehype-attr';
import rehypeIgnore from 'rehype-ignore';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite, { getCodeString } from 'rehype-rewrite';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';
import { useCopied } from './plugins/useCopied';
import "./styles/markdown.css";
import { reservedMeta } from './plugins/reservedMeta';
import { jsx as _jsx } from "react/jsx-runtime";
export default /*#__PURE__*/React.forwardRef((props, ref) => {
  var {
      prefixCls = 'wmde-markdown wmde-markdown-color',
      className,
      source,
      style,
      disableCopy = false,
      skipHtml = true,
      onScroll,
      onMouseOver,
      pluginsFilter,
      rehypeRewrite: rewrite,
      wrapperElement = {},
      warpperElement = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var mdp = React.useRef(null);
  useImperativeHandle(ref, () => _extends({}, props, {
    mdp
  }), [mdp, props]);
  var cls = (prefixCls || '') + " " + (className || '');
  useCopied(mdp);
  var rehypeRewriteHandle = (node, index, parent) => {
    if (node.type === 'element' && parent && parent.type === 'root' && /h(1|2|3|4|5|6)/.test(node.tagName)) {
      var child = node.children && node.children[0];
      if (child && child.properties && child.properties.ariaHidden === 'true') {
        child.properties = _extends({
          class: 'anchor'
        }, child.properties);
        child.children = [octiconLink];
      }
    }
    if (node.type === 'element' && node.tagName === 'pre' && !disableCopy) {
      var code = getCodeString(node.children);
      node.children.push(copyElement(code));
    }
    rewrite && rewrite(node, index, parent);
  };
  var rehypePlugins = [reservedMeta, [rehypePrism, {
    ignoreMissing: true
  }], slug, headings, rehypeIgnore, [rehypeRewrite, {
    rewrite: rehypeRewriteHandle
  }], [rehypeAttrs, {
    properties: 'attr'
  }], ...(other.rehypePlugins || [])];
  var customProps = {
    allowElement: (element, index, parent) => {
      if (other.allowElement) {
        return other.allowElement(element, index, parent);
      }
      return /^[A-Za-z0-9]+$/.test(element.tagName);
    }
  };
  if (skipHtml) {
    rehypePlugins.push(raw);
  }
  var remarkPlugins = [...(other.remarkPlugins || []), gfm];
  var wrapperProps = _extends({}, warpperElement, wrapperElement);
  return /*#__PURE__*/_jsx("div", _extends({
    ref: mdp,
    onScroll: onScroll,
    onMouseOver: onMouseOver
  }, wrapperProps, {
    className: cls,
    style: style,
    children: /*#__PURE__*/_jsx(ReactMarkdown, _extends({}, customProps, other, {
      skipHtml: skipHtml,
      rehypePlugins: pluginsFilter ? pluginsFilter('rehype', rehypePlugins) : rehypePlugins,
      remarkPlugins: pluginsFilter ? pluginsFilter('remark', remarkPlugins) : remarkPlugins,
      children: source || ''
    }))
  }));
});
//# sourceMappingURL=index.js.map