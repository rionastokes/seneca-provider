"use strict";
/* Copyright © 2022 Richard Rodger, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function provider(options) {
    const seneca = this;
    const injectVars = seneca.export('env/injectVars');
    const providerMap = {};
    Object.entries(options.provider).forEach(([name, p]) => {
        p.name = name;
        // Inject environment variables if defined by @seneca/env
        if (injectVars) {
            p = injectVars(p);
        }
        providerMap[name] = p;
    });
    seneca
        .fix('sys:provider')
        .message('get:key', get_key)
        .message('get:keymap', get_keymap)
        .message('list:provider', list_provider);
    async function get_key(msg) {
        let p = providerMap[msg.provider];
        if (null == p) {
            return { ok: false, why: 'unknown-provider' };
        }
        let kd = p.keys[msg.key];
        if (null == kd) {
            return { ok: false, why: 'unknown-key' };
        }
        return { ok: true, value: kd.value };
    }
    async function get_keymap(msg) {
        let p = providerMap[msg.provider];
        if (null == p) {
            return { ok: false, why: 'unknown-provider' };
        }
        const keymap = seneca.util.deep(p.keys);
        return { ok: true, keymap: keymap };
    }
    async function list_provider(_msg) {
        return {
            ok: true, list: Object.values(providerMap).map((p) => ({
                name: p.name,
                keys: Object.keys(p.keys)
            }))
        };
    }
    const cmdBuilder = {
        list: (seneca, cmdspec, entspec, spec) => {
            seneca.message(makePattern(cmdspec, entspec, spec), makeAction(cmdspec, entspec, spec));
        },
        load: (seneca, cmdspec, entspec, spec) => {
            seneca.message(makePattern(cmdspec, entspec, spec), makeAction(cmdspec, entspec, spec));
        },
        save: (seneca, cmdspec, entspec, spec) => {
            seneca.message(makePattern(cmdspec, entspec, spec), makeAction(cmdspec, entspec, spec));
        },
        remove: (seneca, cmdspec, entspec, spec) => {
            seneca.message(makePattern(cmdspec, entspec, spec), makeAction(cmdspec, entspec, spec));
        },
    };
    const { Value } = seneca.valid;
    const validateSpec = seneca.valid({
        provider: {
            name: String
        },
        entity: Value({
            cmd: Value({
                action: Function
            }, {})
        }, {})
    });
    function entityBuilder(seneca, spec) {
        spec = validateSpec(spec);
        for (let entname in spec.entity) {
            let entspec = spec.entity[entname];
            entspec.name = entname;
            for (let cmdname in entspec.cmd) {
                let cmdspec = entspec.cmd[cmdname];
                cmdspec.name = cmdname;
                cmdBuilder[cmdname](seneca, cmdspec, entspec, spec);
            }
        }
    }
    return {
        exports: {
            entityBuilder
        }
    };
}
// For external testing
provider.intern = {
    makePattern,
    makeAction,
    makeEntize,
    applyModifySpec,
};
function makePattern(cmdspec, entspec, spec) {
    return {
        role: 'entity',
        cmd: cmdspec.name,
        zone: 'provider',
        base: spec.provider.name,
        name: entspec.name
    };
}
function makeAction(cmdspec, entspec, spec) {
    let canon = 'provider/' + spec.provider.name + '/' + entspec.name;
    let action = async function (msg, meta) {
        // let entize = (data: any) => this.entity(canon).data$(data)
        let entize = makeEntize(this, canon);
        return cmdspec.action.call(this, entize, msg, meta);
    };
    Object.defineProperty(action, 'name', { value: 'load_' + entspec.name });
    return action;
}
function makeEntize(seneca, canon) {
    // data -> Entity
    // Entity -> data
    return function entize(data, spec) {
        let isEnt = data &&
            'string' === typeof data.entity$ &&
            'function' === typeof data.data$;
        let out;
        if (isEnt) {
            let raw = data.data$(false);
            out = applyModifySpec(raw, spec);
        }
        else {
            data = applyModifySpec(data, spec);
            out = seneca.entity(canon).data$(data);
        }
        return out;
    };
}
function applyModifySpec(data, spec) {
    if (spec) {
        if (spec.field) {
            for (let field in spec.field) {
                let fieldSpec = spec.field[field];
                // TODO: add more operations
                // 'copy;' is the default operation
                if (null != fieldSpec.src) {
                    data[field] = data[fieldSpec.src];
                }
            }
        }
    }
    return data;
}
// Default options.
const defaults = {
    provider: {}
};
Object.assign(provider, { defaults });
exports.default = provider;
if ('undefined' !== typeof (module)) {
    module.exports = provider;
}
//# sourceMappingURL=provider.js.map