import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import classNames from "classnames";
import { IconSize } from "@blueprintjs/icons";
import { AbstractPureComponent, Classes, DISPLAYNAME_PREFIX } from "../../common";
import { ensureElement } from "../../common/utils";
import { H4 } from "../html/html";
import { Icon } from "../icon/icon";
export var NonIdealStateIconSize;
(function (NonIdealStateIconSize) {
    NonIdealStateIconSize[NonIdealStateIconSize["STANDARD"] = 48] = "STANDARD";
    NonIdealStateIconSize[NonIdealStateIconSize["SMALL"] = 32] = "SMALL";
    NonIdealStateIconSize[NonIdealStateIconSize["EXTRA_SMALL"] = 20] = "EXTRA_SMALL";
})(NonIdealStateIconSize || (NonIdealStateIconSize = {}));
/**
 * Non-ideal state component.
 *
 * @see https://blueprintjs.com/docs/#core/components/non-ideal-state
 */
export class NonIdealState extends AbstractPureComponent {
    static displayName = `${DISPLAYNAME_PREFIX}.NonIdealState`;
    static defaultProps = {
        iconMuted: true,
        iconSize: NonIdealStateIconSize.STANDARD,
        layout: "vertical",
    };
    render() {
        const { action, children, className, layout } = this.props;
        return (_jsxs("div", { className: classNames(Classes.NON_IDEAL_STATE, `${Classes.NON_IDEAL_STATE}-${layout}`, className), children: [this.maybeRenderVisual(), this.maybeRenderText(), action, children] }));
    }
    maybeRenderVisual() {
        const { icon, iconMuted, iconSize } = this.props;
        if (icon == null) {
            return undefined;
        }
        else {
            return (_jsx("div", { className: Classes.NON_IDEAL_STATE_VISUAL, style: { fontSize: `${iconSize}px`, lineHeight: `${iconSize}px` }, children: _jsx(Icon, { className: classNames({ [Classes.ICON_MUTED]: iconMuted }), icon: icon, size: iconSize, "aria-hidden": true, tabIndex: -1 }) }));
        }
    }
    maybeRenderText() {
        const { description, title } = this.props;
        if (title == null && description == null) {
            return undefined;
        }
        else {
            return (_jsxs("div", { className: Classes.NON_IDEAL_STATE_TEXT, children: [title && _jsx(H4, { children: title }), description && ensureElement(description, "div")] }));
        }
    }
}
//# sourceMappingURL=nonIdealState.js.map