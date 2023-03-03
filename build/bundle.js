
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is updated after any state change.
     *
     * The first time the callback runs will be before the initial `onMount`
     *
     * https://svelte.dev/docs#run-time-svelte-beforeupdate
     */
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.55.0 */

    const { Error: Error_1$2, Object: Object_1, console: console_1 } = globals;

    // (267:0) {:else}
    function create_else_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(267:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (260:0) {#if componentParams}
    function create_if_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(260:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1$2("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    function restoreScroll(state) {
    	// If this exists, then this is a back navigation: restore the scroll position
    	if (state) {
    		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
    	} else {
    		// Otherwise this is a forward navigation: scroll to top
    		window.scrollTo(0, 0);
    	}
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			restoreScroll(previousScrollState);
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		restoreScroll,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get routes() {
    		throw new Error_1$2("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1$2("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1$2("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1$2("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1$2("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1$2("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/navigation/Nav.svelte generated by Svelte v3.55.0 */
    const file$i = "src/components/navigation/Nav.svelte";

    // (20:4) {:else}
    function create_else_block$2(ctx) {
    	let a;
    	let span0;
    	let t1;
    	let span1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			a = element("a");
    			span0 = element("span");
    			span0.textContent = "⭡";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "Go back to all projects";
    			attr_dev(span0, "class", "svelte-p3fxd1");
    			add_location(span0, file$i, 21, 12, 995);
    			attr_dev(span1, "class", "svelte-p3fxd1");
    			add_location(span1, file$i, 22, 12, 1029);
    			attr_dev(a, "href", "/projects");
    			attr_dev(a, "class", "project-nav txt-p txt-grey svelte-p3fxd1");
    			add_location(a, file$i, 20, 8, 918);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, span0);
    			append_dev(a, t1);
    			append_dev(a, span1);

    			if (!mounted) {
    				dispose = action_destroyer(link.call(null, a));
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(20:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (9:4) {#if isMain}
    function create_if_block$2(ctx) {
    	let ul;
    	let div0;
    	let li0;
    	let a0;
    	let t0;
    	let a0_aria_current_value;
    	let t1;
    	let div1;
    	let li1;
    	let a1;
    	let t2;
    	let a1_aria_current_value;
    	let t3;
    	let li2;
    	let a2;
    	let t4;
    	let a2_aria_current_value;
    	let t5;
    	let li3;
    	let a3;
    	let t6;
    	let a3_aria_current_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			div0 = element("div");
    			li0 = element("li");
    			a0 = element("a");
    			t0 = text("Marc Biemer");
    			t1 = space();
    			div1 = element("div");
    			li1 = element("li");
    			a1 = element("a");
    			t2 = text("Info");
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			t4 = text("Projects");
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			t6 = text("Contact");
    			attr_dev(a0, "class", "txt-p txt-grey svelte-p3fxd1");
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "aria-current", a0_aria_current_value = /*active*/ ctx[0] === 'home' ? 'page' : undefined);
    			add_location(a0, file$i, 11, 20, 247);
    			add_location(li0, file$i, 11, 16, 243);
    			attr_dev(div0, "class", "svelte-p3fxd1");
    			add_location(div0, file$i, 10, 12, 221);
    			attr_dev(a1, "class", "txt-p txt-grey svelte-p3fxd1");
    			attr_dev(a1, "href", "/info");
    			attr_dev(a1, "aria-current", a1_aria_current_value = /*active*/ ctx[0] === 'info' ? 'page' : undefined);
    			add_location(a1, file$i, 14, 20, 450);
    			add_location(li1, file$i, 14, 16, 446);
    			attr_dev(a2, "class", "txt-p txt-grey svelte-p3fxd1");
    			attr_dev(a2, "href", "/projects");
    			attr_dev(a2, "aria-current", a2_aria_current_value = /*active*/ ctx[0] === 'projects' ? 'page' : undefined);
    			add_location(a2, file$i, 15, 20, 588);
    			add_location(li2, file$i, 15, 16, 584);
    			attr_dev(a3, "class", "txt-p txt-grey svelte-p3fxd1");
    			attr_dev(a3, "href", "/contact");
    			attr_dev(a3, "aria-current", a3_aria_current_value = /*active*/ ctx[0] === 'contact' ? 'page' : undefined);
    			add_location(a3, file$i, 16, 20, 738);
    			add_location(li3, file$i, 16, 16, 734);
    			attr_dev(div1, "class", "nav-item-wrapper svelte-p3fxd1");
    			add_location(div1, file$i, 13, 12, 399);
    			attr_dev(ul, "class", "svelte-p3fxd1");
    			add_location(ul, file$i, 9, 8, 204);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, div0);
    			append_dev(div0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, t0);
    			append_dev(ul, t1);
    			append_dev(ul, div1);
    			append_dev(div1, li1);
    			append_dev(li1, a1);
    			append_dev(a1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, li2);
    			append_dev(li2, a2);
    			append_dev(a2, t4);
    			append_dev(div1, t5);
    			append_dev(div1, li3);
    			append_dev(li3, a3);
    			append_dev(a3, t6);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(link.call(null, a0)),
    					action_destroyer(link.call(null, a1)),
    					action_destroyer(link.call(null, a2)),
    					action_destroyer(link.call(null, a3))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*active*/ 1 && a0_aria_current_value !== (a0_aria_current_value = /*active*/ ctx[0] === 'home' ? 'page' : undefined)) {
    				attr_dev(a0, "aria-current", a0_aria_current_value);
    			}

    			if (dirty & /*active*/ 1 && a1_aria_current_value !== (a1_aria_current_value = /*active*/ ctx[0] === 'info' ? 'page' : undefined)) {
    				attr_dev(a1, "aria-current", a1_aria_current_value);
    			}

    			if (dirty & /*active*/ 1 && a2_aria_current_value !== (a2_aria_current_value = /*active*/ ctx[0] === 'projects' ? 'page' : undefined)) {
    				attr_dev(a2, "aria-current", a2_aria_current_value);
    			}

    			if (dirty & /*active*/ 1 && a3_aria_current_value !== (a3_aria_current_value = /*active*/ ctx[0] === 'contact' ? 'page' : undefined)) {
    				attr_dev(a3, "aria-current", a3_aria_current_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(9:4) {#if isMain}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let nav;

    	function select_block_type(ctx, dirty) {
    		if (/*isMain*/ ctx[1]) return create_if_block$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if_block.c();
    			attr_dev(nav, "aria-label", "Main");
    			attr_dev(nav, "class", "pd-lr pd-tb-sm max-width svelte-p3fxd1");
    			add_location(nav, file$i, 7, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			if_block.m(nav, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(nav, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let { active = '' } = $$props;
    	let { isMain = true } = $$props;
    	const writable_props = ['active', 'isMain'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('isMain' in $$props) $$invalidate(1, isMain = $$props.isMain);
    	};

    	$$self.$capture_state = () => ({ link, active, isMain });

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('isMain' in $$props) $$invalidate(1, isMain = $$props.isMain);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, isMain];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { active: 0, isMain: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get active() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isMain() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isMain(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/navigation/Footer.svelte generated by Svelte v3.55.0 */

    const file$h = "src/components/navigation/Footer.svelte";

    function create_fragment$h(ctx) {
    	let footer;
    	let span;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			span = element("span");
    			span.textContent = "© 2023 Marc Biemer";
    			attr_dev(span, "class", "txt-c grey");
    			add_location(span, file$h, 1, 4, 46);
    			attr_dev(footer, "class", "pd-lr pd-tb-sm max-width svelte-8dkmx2");
    			add_location(footer, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, span);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/Statement.svelte generated by Svelte v3.55.0 */

    const file$g = "src/components/Statement.svelte";

    function create_fragment$g(ctx) {
    	let section;
    	let header;
    	let h2;
    	let t0;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let p1;
    	let t4;

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p0 = element("p");
    			t2 = text(/*subtitle*/ ctx[1]);
    			t3 = space();
    			p1 = element("p");
    			t4 = text(/*body*/ ctx[2]);
    			attr_dev(h2, "class", "txt-p txt-black svelte-1q06mlp");
    			add_location(h2, file$g, 8, 8, 152);
    			attr_dev(p0, "class", "txt-p txt-black svelte-1q06mlp");
    			add_location(p0, file$g, 9, 8, 201);
    			attr_dev(header, "class", "svelte-1q06mlp");
    			add_location(header, file$g, 7, 4, 135);
    			attr_dev(p1, "class", "txt-h txt-greyLight");
    			add_location(p1, file$g, 11, 4, 261);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-1q06mlp");
    			add_location(section, file$g, 6, 0, 88);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, h2);
    			append_dev(h2, t0);
    			append_dev(header, t1);
    			append_dev(header, p0);
    			append_dev(p0, t2);
    			append_dev(section, t3);
    			append_dev(section, p1);
    			append_dev(p1, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*subtitle*/ 2) set_data_dev(t2, /*subtitle*/ ctx[1]);
    			if (dirty & /*body*/ 4) set_data_dev(t4, /*body*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Statement', slots, []);
    	let { title } = $$props;
    	let { subtitle } = $$props;
    	let { body } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Statement> was created without expected prop 'title'");
    		}

    		if (subtitle === undefined && !('subtitle' in $$props || $$self.$$.bound[$$self.$$.props['subtitle']])) {
    			console.warn("<Statement> was created without expected prop 'subtitle'");
    		}

    		if (body === undefined && !('body' in $$props || $$self.$$.bound[$$self.$$.props['body']])) {
    			console.warn("<Statement> was created without expected prop 'body'");
    		}
    	});

    	const writable_props = ['title', 'subtitle', 'body'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Statement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(1, subtitle = $$props.subtitle);
    		if ('body' in $$props) $$invalidate(2, body = $$props.body);
    	};

    	$$self.$capture_state = () => ({ title, subtitle, body });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(1, subtitle = $$props.subtitle);
    		if ('body' in $$props) $$invalidate(2, body = $$props.body);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, subtitle, body];
    }

    class Statement extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { title: 0, subtitle: 1, body: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Statement",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get title() {
    		throw new Error("<Statement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Statement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtitle() {
    		throw new Error("<Statement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtitle(value) {
    		throw new Error("<Statement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get body() {
    		throw new Error("<Statement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set body(value) {
    		throw new Error("<Statement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Services.svelte generated by Svelte v3.55.0 */

    const file$f = "src/components/Services.svelte";

    function create_fragment$f(ctx) {
    	let section;
    	let header;
    	let p0;
    	let t1;
    	let h2;
    	let t2;
    	let br;
    	let t3;
    	let t4;
    	let div0;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let div1;
    	let p3;
    	let t10;
    	let p4;

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			p0 = element("p");
    			p0.textContent = "Change the routine";
    			t1 = space();
    			h2 = element("h2");
    			t2 = text("Design fuelled by ");
    			br = element("br");
    			t3 = text("research & art");
    			t4 = space();
    			div0 = element("div");
    			p1 = element("p");
    			p1.textContent = "I'm a passionate, hands-on designer with an analytical mindset. My work is driven by creativity, curiosity, and a persistent desire to learn.";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "I find joy in tinkering with emerging technologies – enabling teams to turn their potential into impactful experiences.";
    			t8 = space();
    			div1 = element("div");
    			p3 = element("p");
    			p3.textContent = "Explore today. Design tomorrow.";
    			t10 = space();
    			p4 = element("p");
    			p4.textContent = "Inspire. Excite.";
    			attr_dev(p0, "class", "txt-p txt-black");
    			add_location(p0, file$f, 2, 8, 64);
    			add_location(br, file$f, 3, 54, 168);
    			attr_dev(h2, "class", "txt-h txt-black");
    			add_location(h2, file$f, 3, 8, 122);
    			attr_dev(header, "class", "svelte-1q43o1i");
    			add_location(header, file$f, 1, 4, 47);
    			attr_dev(p1, "class", "txt-p txt-grey");
    			add_location(p1, file$f, 6, 8, 241);
    			attr_dev(p2, "class", "txt-p txt-grey");
    			add_location(p2, file$f, 7, 8, 421);
    			attr_dev(div0, "class", "body svelte-1q43o1i");
    			add_location(div0, file$f, 5, 4, 214);
    			attr_dev(p3, "class", "txt-c txt-grey");
    			add_location(p3, file$f, 10, 8, 616);
    			attr_dev(p4, "class", "txt-c txt-grey");
    			add_location(p4, file$f, 11, 8, 686);
    			attr_dev(div1, "class", "details svelte-1q43o1i");
    			add_location(div1, file$f, 9, 4, 586);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-1q43o1i");
    			add_location(section, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, p0);
    			append_dev(header, t1);
    			append_dev(header, h2);
    			append_dev(h2, t2);
    			append_dev(h2, br);
    			append_dev(h2, t3);
    			append_dev(section, t4);
    			append_dev(section, div0);
    			append_dev(div0, p1);
    			append_dev(div0, t6);
    			append_dev(div0, p2);
    			append_dev(section, t8);
    			append_dev(section, div1);
    			append_dev(div1, p3);
    			append_dev(div1, t10);
    			append_dev(div1, p4);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Services', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Services> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Services extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Services",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    const projects = [
        // {
        //     info: {
        //         title: 'Alva Labs',
        //         year: '2022 – 2023',
        //         con: ['UX Research', 'UX|UI Design'],
        //         path: 'alva-labs',
        //     },
        //     preview: {
        //         url: 'https://placebear.com/1900/',
        //         imgAlt: 'test',
        //         dark: true,
        //     },
        //     content: [
        //         {
        //             block: 'txt',
        //             title: 'Team',
        //             body: "<ul><li>1x Product Manager</li><li>1x Designer</li></ul>",
        //         },
        //         {
        //             block: 'img',
        //             type: 's',
        //             pd: undefined,
        //             img: [
        //                 {src: 'https://placebear.com/500/',
        //                 alt: 'test'},
        //                 {src: 'https://placebear.com/1200/',
        //                 alt: 'test'},
        //             ],
        //         },
        //         {
        //             block: 'img',
        //             type: 'c',
        //             pd: 'pd-tb-lg',
        //             img: [
        //                 {src: 'https://placebear.com/500/',
        //                 alt: 'test'},
        //             ],
        //         },
        //         {
        //             block: 'img',
        //             type: '',
        //             pd: '',
        //             img: [
        //                 {src: 'https://placebear.com/500/',
        //                 alt: 'test'},
        //             ],
        //         },
        //         {
        //             block: 'txt',
        //             title: 'Team',
        //             body: "<ul><li>1x Product Manager</li><li>1x Designer</li></ul>",
        //         },
        //     ],
        // },
        {
            info: {
                title: 'Data Portraits',
                year: '2021',
                con: ['UX Design', 'Data Visualisation', 'Creative Coding'],
                path: 'data-portraits',
            },
            preview: {
                url: '/images/projects/dataPortraits/hero/Hero-',
                imgAlt: 'Postcards showing different Data Portraits.',
                dark: true,
            },
            content: [
                {
                    block: 'txt',
                    title: 'Reinventing the postcard',
                    body: '<a href="https://futurice.com/" target="_blank" rel="noreferrer">Futurice</a>’s Marketing team approached me asking for a quirky, personal way to engage with our local business contacts in Sweden. In our discussions we fell in love with the thought of turning an ordinary postcard into a more innovative and engaging experience. I started experimenting with concepts that could make the postcard reflect the sender’s personality and ended up with the idea to turn the motif featured on the front of the card into a data portrait of its sender.<br><br>Team<ul><li>1x Head of Marketing</li><li>1x Digital Product Designer</li></ul>',
                },
                {
                    block: 'img',
                    type: 'f',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/dataPortraits/details/Banner-',
                        alt: 'Selected Data Portrait Postcards of our Stockholm team.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Designing data portraits',
                    body: 'Our team came up with a questionnaire consisting of nine simple questions focused on the subject’s professional profile and ways of working. In order to depict the responses in a comprehensible manner, I designed graphical metaphors and analogies to represent the data in an intriguing way. This ranged from transforming their name into a personal background pattern, to mimicking an analog clock illustrating the subject’s most creative time of the day, or defining shapes to reflect their favorite coffee break snack.<br>Rather than creating each individual design manually, I wrote a custom piece of code using <a href="https://processing.org/" target="_blank" rel="noreferrer">Processing</a> to handle this part of the process for us. In the end, creating data portraits for an entire team became as simple as moving a CSV file with the questionnaire responses into a dedicated folder, and executing the code.',
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-tb-lg',
                    img: [
                        {src: '/images/projects/dataPortraits/details/Details-',
                        alt: 'Questionnaire with visual translation of its answers.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-t-lg',
                    img: [
                        {src: '/images/projects/dataPortraits/production/ProductionA-',
                        alt: 'Data Portrait Postcards Stacking'},
                        {src: '/images/projects/dataPortraits/production/ProductionB-',
                        alt: 'Cutting Data Portrait postcards'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Conclusion',
                    body: 'Over the course of this process, a seemingly simple task at hand unfolded into a much larger and more meaningful experience. Besides sparking joy and excitement at our clients and business partners, the data portraits turned out to be great conversation starters even within our own company. <a href="https://futurice.com/blog/data-portrait-postcards" target="_blank" rel="noreferrer">Read the full blog post</a>.',
                },
            ],
        },
        // {
        //     info: {
        //         title: 'AI-Powered Search',
        //         year: '2021 – 2022',
        //         con: ['UX Research', 'UX | UI Design', 'Cognitive Systems'],
        //         path: 'ai-powered-search',
        //     },
        //     preview: {
        //         url: 'https://placebear.com/1800/',
        //         imgAlt: 'test',
        //         dark: true,
        //     },
        //     content: [
        //         {
        //             block: 'txt',
        //             title: 'Finding the right answer',
        //             body: 'With AI finding its way into more and more services, a leading provider of renewable materials approached our team at <a href="https://futurice.com/" target="_blank" rel="noreferrer">Futurice</a> to support them in exploring the potential of AI-powered search. Given an unstructured collection of sustainability documents, we set out to improve the discoverability of the information within these documents for internal and external users.<br><br>Team<ul><li>1x Product Owner + 1x Sustainability Expert</li><li>3x Software Engineer</li><li>2x Digital Product Designer</li></ul>',
        //         },
        //         {
        //             block: 'txt',
        //             title: 'Architectural concept',
        //             body: 'A preceding project yielded initial concept designs for individual point-solutions. I revised these concepts and proposed a new information architecture that would join the point-solutions into a single product interface. Together with a data scientist, I furthermore explored potential feedback loops and forms of user feedback.',
        //         },
        //         {
        //             block: 'txt',
        //             title: 'Prototyping and UI design',
        //             body: 'I created an interactive prototype based on our hypotheses which was tested in exploratory interviews. Through different exercises users evaluated the prototype’s usability and feedback mechanisms. The interviewees further ranked the presented features, which informed the product roadmap and MVP scope. The designs were reworked and evolved according to the received feedback. I prepared the specifications and required assets for the development team, which simultaneously started the implementation of the MVP.',
        //         },
        //         {
        //             block: 'txt',
        //             title: 'User testing',
        //             body: 'To evaluate the MVP, I conceived a research study involving 25 testers. We ran focus groups to identify usability issues and a longitudinal survey to measure user engagement. Based on the study insights, we created a backlog for the next project phase. The positive feedback within and outside the client organization secured funding to further expand the service and our team. This allowed us to continuously deliver new functionalities, enabling other departments to connect to our service. We further improved existing UI components before eventually launching the service to the paper and cardboard division’s user base.',
        //         },
        //     ],
        // },
        // {
        //     info: {
        //         title: 'Packaging Toolbox',
        //         year: '2021 – 2022',
        //         con: ['UX | UI Design', '3D', 'AR'],
        //         path: 'packaging-design-tools',
        //     },
        //     preview: {
        //         url: 'https://placebear.com/1500/',
        //         imgAlt: 'test',
        //         dark: true,
        //     },
        //     content: [
        //         {
        //             block: 'txt',
        //             title: 'Thinking outside the box',
        //             body: 'Studies indicate that packaging design elements like color, imagery, and logos influence the way we think and feel about its contents. As part of my work at <a href="https://futurice.com/" target="_blank" rel="noreferrer">Futurice</a> I headed the design of a series of innovative packaging design tools for an eco-friendly packaging solutions provider.<br><br>Team<ul><li>1x Product Owner + 1x Packaging Expert</li><li>1x Data Scientist </li><li>1x Frontend Engineer + 2x Software Engineer</li><li>1x Digital Product Designer</li></ul>',
        //         },
        //         {
        //             block: 'txt',
        //             title: '3D design tool',
        //             body: 'In one project stream, I joined a multidisciplinary team which had built an initial proof of concept for a 3D packaging design tool. In close collaboration with a front-end developer and a packaging design expert, I revised the existing designs and refined the overall information architecture of the product.<br>One core functionality of the tool included the design of a UI to interact with three-dimensional packaging models, allowing users to intuitively apply color and imagery to different parts of the packaging. We additionally designed an augmented reality view to allow users to experience their designs in a more realistic context. The designs were tested with potential users through interactive prototypes which I prepared.',
        //         },
        //         {
        //             block: 'txt',
        //             title: 'Stress test simulator',
        //             body: 'Another stream with a similar team setup, developed a digital solution using artificial intelligence to simulate stress caused through transport conditions like stacking or humidity. I again started the project by revising existing and refining existing work. One of the core interactions I designed enabled users to configure different packaging solutions with custom materials, folds or cutouts. Another interaction visualized the stress test results in three dimensional space and provided functionalities for users to analyze and compare the performance of different box designs.',
        //         },
        //         {
        //             block: 'txt',
        //             title: 'Conclusion',
        //             body: 'Throughout the project I ensured adherence to the clients CI and design system to create a coherent interface language across the different products. This sparked new conversations and collaborations on the evolution of their design system. The toolbox itself did end up not only encouraging external users to explore potential designs themselves, but moreover improved the communication between the different parties involved in the design process.',
        //         },
        //     ],
        // },
        {
            info: {
                title: 'Spark MR',
                year: '2019',
                con: ['Research', 'MR Game Design', 'Data Analysis'],
                path: 'spark',
            },
            preview: {
                url: '/images/projects/spark/hero/Hero-',
                imgAlt: 'Kids playing Spark MR.',
                dark: true,
            },
            content: [
                {
                    block: 'txt',
                    title: 'Mixed reality gaming for social initiation',
                    body: 'To support children affected by an autism spectrum condition in learning about social initiation, researchers have been developing various intervention techniques. A promising line of research was found in the usage of game-based technology-enhanced interventions facilitating physical embodiment such as <a href="https://www.upf.edu/web/fubintlab/landsoffog" target="_blank" rel="noreferrer">Lands of Fog</a> (developed by the <a href="https://www.upf.edu/web/fubintlab" target="_blank" rel="noreferrer">Full-Body Interaction Laboratory, UPF Barcelona</a>). Despite its preceding success, Lands of Fog yielded further improvement potentials. In my master thesis project, I designed, developed and empirically validated a possible successor called Spark.<br><br>Team<ul><li>1x Software Engineer</li><li>1x 3D Artist</li><li>1x Digital Designer</li></ul>',
                },
                {
                    block: 'img',
                    type: 'f',
                    pd: '',
                    img: [
                        {src: '/images/projects/spark/software/Logo-',
                        alt: 'The Spark logotype on a dark-purple background surrounded by little, colorful planets and some stars.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Preliminary analysis',
                    body: 'I started with an analysis of preceding projects and relevant research literature, which provided deeper understanding of successful design features and possible limitations. Appropriate design principles, development criteria and strategies were derived from the gained knowledge and guided the development of Spark.',
                },
                {
                    block: 'txt',
                    title: 'Hardware design',
                    body: 'The designed installation required two high-quality projectors, allowing for a six by six meters floor projection. Speakers accompanied the visual stimuli with auditive ones. Each child was equipped with a custom-made handheld device. LED strips within the controllers allowed position tracking through four ceiling-mounted cameras.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/spark/hardware/Controller-',
                        alt: 'A technical drawing of the handheld controllers utilized for playing Spark.'},
                        {src: '/images/projects/spark/hardware/Hardware-',
                        alt: 'A technical drawing of the hardware environment used for Spark.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Game design (Mixed reality)',
                    body: 'We created a virtual environment using Unity, which was projected onto the floor. The environment was based on a deep space theme, where two children (ideally one neurotypical child and one child on the spectrum) could create, collect and interact with planet-like shapes, forming their own universe together.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/spark/hero/Hero-',
                        alt: 'Children playing Spark.'},
                        {src: '/images/projects/spark/hero/Play-',
                        alt: 'More children playing Spark.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/spark/software/ContentsA-',
                        alt: 'An extract of the virtual elements found within Spark, e.g. an Asteroid.'},
                        {src: '/images/projects/spark/software/ContentsB-',
                        alt: 'An extract of other virtual elements found within Spark, e.g. a Black Hole.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Testing and validation',
                    body: 'In total 44 neurotypical children from local school classes provided insights during the design and development of Spark’s game mechanics. Due to restrictions enacted in response to the COVID-19 pandemic, the final evaluation of Spark was based on a study with 18 neurotypical children. Pairs of children thereby tested Spark in a ten-minute play session before independently reporting their engagement and intention to join future sessions through a digital post-play questionnaire. I further analysed gathered usage data e.g. player movement and visualised the data, here in form of heatmaps for easier comparison. Additionally, semi-structured interviews with three psychologists assessed Spark’s potential efficacy.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: '',
                    img: [
                        {src: '/images/projects/spark/analysis/PlayersOneRed-',
                        alt: 'Data Visualizations, heatmap of the movement profile of selected child.'},
                        {src: '/images/projects/spark/analysis/PlayersOneBlue-',
                        alt: 'Data Visualizations, heatmap of the movement profile of selected child.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/spark/analysis/PlayersTwoBlue-',
                        alt: 'Data Visualizations, heatmap of the movement profile of selected child.'},
                        {src: '/images/projects/spark/analysis/PlayersTwoRed-',
                        alt: 'Data Visualizations, heatmap of the movement profile of selected child.'},
                    ],
                },
            ],
        },
        {
            info: {
                title: 'Logistics 4.0',
                year: '2018 – 2019',
                con: ['UX Research', 'Service Design', 'Co-Creation'],
                path: 'logistics',
            },
            preview: {
                url: '/images/projects/logistics/hero/Hero-',
                imgAlt: 'Birds-eye view of a logitic terminal.',
                dark: true,
            },
            content: [
                {
                    block: 'txt',
                    title: 'Reimagining logistics',
                    body: 'Despite being the largest industry worldwide, the logistic sector is only slowly digitalising. Together with a truck and bus manufacturer, we tackled the issues caused by paper-based processes and investigated potential digital solutions. In my role as senior service designer I was responsible for shaping the project’s design process.<br><br>Team<ul><li>1x Product Owner</li><li>1x Service Designer</li><li>2x UX | UI Designer + 1x Design Intern</li><li>1x Software Engineer + 1x Data Scientist</li></ul>',
                },
                {
                    block: 'img',
                    type: 'f',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/logistics/research/Banner-',
                        alt: 'Multiple user journey maps of parties involved in processes at a logistic terminal, some blurred out.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'User research',
                    body: 'We started the project by exploring the problem space and context through stakeholder interviews. Especially talking to truck drivers and operational staff unveiled unexpected, urgent pains. To gain a holistic overview of the complex processes we documented our insights in journey maps and process flow charts. This also made it easier to share our findings with others.',
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/logistics/research/JourneyMap-',
                        alt: 'The user journey of an employee working at a droping station on a logistics terminal.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Playful co-creation',
                    body: 'The highlighted issues were discussed and worked on during co-creation workshops involving logistic experts and diverse stakeholder groups. I designed and facilitated the workshops based on frameworks used in generative research. Additionally, I incorporated the <a href="https://iotservicekit.com/" target="_blank" rel="noreferrer">IoT Service Kit by Futurice</a> to facilitate a playful exploration of novel ideas.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/logistics/workshop/IoT-Toolkit-',
                        alt: 'The IoT Service Kit used for co-creation workshops.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-tb-sm',
                    img: [
                        {src: '/images/projects/logistics/workshop/WorkshopOne-',
                        alt: 'Participants of a co-creation workshop discussing solutions using the IoT Service Kit.'},
                        {src: '/images/projects/logistics/workshop/WorkshopTwo-',
                        alt: 'Another team of participants of a co-creation workshop discussing solutions using the IoT Service Kit.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Prototyping',
                    body: 'After refining the generated concepts, the team and I came up with Wizard of Oz prototypes that could be tested in the field. During the tests we measured key metrics to evaluate our concepts such as time to completion. This allowed us to showcase our impact towards management and to secure future project funding.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/logistics/proto/Large-',
                        alt: 'Prototypes for delivery tracking.'},
                    ],
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-t-lg',
                    img: [
                        {src: '/images/projects/logistics/proto/Mixed-',
                        alt: 'Prototypes for time window booking and delivery overview.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-tb-lg',
                    img: [
                        {src: '/images/projects/logistics/proto/Small-',
                        alt: 'Prototypes for gate and loading control on tablet and laptop screens.'},
                    ],
                },
            ],
        },
        {
            info: {
                title: 'Vitafy',
                year: '2016 – 2017',
                con: ['UX Research', 'UX | UI Design'],
                path: 'vitafy',
            },
            preview: {
                url: '/images/projects/vitafy/hero/Hero-',
                imgAlt: 'A smartphone on the table displaying the Vitafy website.',
                dark: true,
            },
            content: [
                {
                    block: 'txt',
                    title: 'Frictionless shopping',
                    body: 'As one of two UX designers at <a href="https://www.vitafy.de/" target="_blank" rel="noreferrer">Vitafy</a>, I worked on creating a seamless online shopping experience for fitness and nutrition enthusiasts. Since the design team had just been formed, we started by laying the foundations for an efficient collaboration and delivery through formalizing our processes.<br><br>Team<ul><li>2x Frontend Developer</li><li>2x UX Designer</li></ul>',
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/vitafy/hero/Banner-',
                        alt: 'A smartphone and laptop displaying the Vitafy website, homepage.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Journey mapping and prioritization',
                    body: 'To gain a deeper understanding of our user base, we ran an extensive research project. Asides from conducting interviews, we analyzed usage data and secondary research, such as the benchmarking reports by the <a href="https://baymard.com/" target="_blank" rel="noreferrer">Baymard Institute</a>. The outcomes were visualized in the form of user journey maps and user personas supporting interdepartmental communication.<br>We combined the identified user pains with fall offs in conversion, and prioritized the list of issues based on their potential impact on user experience, business performance and development capacity. As a result we created a product roadmap which was revised monthly.',
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/vitafy/research/JourneyMap-',
                        alt: 'A typical user journey of a Vitafy customer.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-t-lg pd-b-sm',
                    img: [
                        {src: '/images/projects/vitafy/research/Personae-',
                        alt: 'Multiple user personae created for internal communication at Vitafy.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'User flow and interface design',
                    body: 'From here we redesigned the whole web shop section by section. I led multiple projects, incl. the main navigation, home page, newsletter sign up, product details pages as well as the cart. Each project covered a discovery phase, prototyping and usability testing as well as designing and handing over the final implementation.<br>Most design changes underwent a/b testing to assure a significant performance uplift. The usage of tracking software like <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">Google Analytics</a>, <a href="https://www.inspectlet.com/" target="_blank" rel="noreferrer">Inspectlet</a> and <a href="https://www.optimizely.com/" target="_blank" rel="noreferrer">Optimizely</a> supported our evaluation process.',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/vitafy/ui/Mock-Hand-',
                        alt: 'Mannequin hand holding a smartphone displaying a Vitafy blog post.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/vitafy/ui/Mock-Phones-',
                        alt: '3 smartphones displaying the product catalogue and details pages.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/vitafy/ui/Mock-Mixed-',
                        alt: 'A laptop showing a Vitafy blog post with 2 smartphones in the background.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Design system setup',
                    body: 'Along the way, I also drove the establishment of a design system – not only to assure visual consistency but to further improve the website’s performance. Revising the shop on a component basis allowed us to improve the usability and accessibility of each element.',
                },
                {
                    block: 'img',
                    type: 'c',
                    pd: 'pd-t-sm',
                    img: [
                        {src: '/images/projects/vitafy/designSystem/DesignSystem-',
                        alt: 'An extract of the design system implemented for Vitafy.'},
                    ],
                },
            ],
        },
        {
            info: {
                title: 'Personal Projects',
                year: 'since 2017',
                con: ['Graphic Design'],
                path: 'graphics',
            },
            preview: {
                url: '/images/projects/graphics/hero/Hero-',
                imgAlt: 'A wall full of stickers.',
                dark: true,
            },
            content: [
                {
                    block: 'txt',
                    title: 'Graphic design',
                    body: "On occasion, I take on graphic design projects. This page presents a selection of pieces I produced. Some were based on requests by friends and made their way out into the world, others were created for personal use only.",
                },
                {
                    block: 'txt',
                    title: 'Girls just wanna',
                    body: 'A set of stickers for <a href="https://www.instagram.com/kaaaaatze/" target="_blank" rel="noreferrer">@kaaaaatze</a>, 2019',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/graphics/sticker/banner-',
                        alt: 'The different color versions of the sticker of the Girls Just Wanna Have Fun-damental Rights and Equal Pay movement'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-tb-sm pd-b-lg',
                    img: [
                        {src: '/images/projects/graphics/hero/Hero-',
                        alt: 'A wall full of stickers, including a sticker of the Girls Just Wanna Have Fun-damental Rights and Equal Pay movement.'},
                        {src: '/images/projects/graphics/sticker/poster-',
                        alt: 'The sticker of the Girls Just Wanna Have Fun-damental Rights and Equal Pay movement on top of the picture of a woman showing the peace sign during a protest.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'My Best Friend’s Wallet',
                    body: 'A podcast cover for <a href="https://podcasts.apple.com/us/podcast/my-best-friends-wallet/id1509597779" target="_blank" rel="noreferrer">My Best Friend’s Wallet by Melanie Julison</a>, 2020',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/graphics/podcast/concept-',
                        alt: 'The components of the podcast cover designed for the podcast My Best Friends Wallet.'},
                        {src: '/images/projects/graphics/podcast/contrast-',
                        alt: 'The podcast cover of My Best Friends Wallet on light and on dark background.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-tb-sm pd-b-lg',
                    img: [
                        {src: '/images/projects/graphics/podcast/banner-',
                        alt: 'A banner displaying two smartphones and a laptop listening to the podcast My Best Friends Wallet.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Sekundär',
                    body: 'A calendar concept for private use, 2018',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: undefined,
                    img: [
                        {src: '/images/projects/graphics/calendar/full-',
                        alt: 'A list of all calendar pages included in the Sekundär Calendar by Marc Biemer.'},
                    ],
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-tb-sm pd-b-lg',
                    img: [
                        {src: '/images/projects/graphics/calendar/detail-',
                        alt: 'The lower part of a calendar page displaying a quote and the seconds within this month.'},
                    ],
                },
                {
                    block: 'txt',
                    title: 'Träume eines Mörders',
                    body: 'A book cover for <a href="https://www.meikearend.com/" target="_blank" rel="noreferrer">Meike Arend’s</a> first thriller, 2017',
                },
                {
                    block: 'img',
                    type: 's',
                    pd: 'pd-b-lg',
                    img: [
                        {src: '/images/projects/graphics/book/composition-',
                        alt: 'The book cover (all sides) of Träume eines Mörders by Meike Arend.'},
                        {src: '/images/projects/graphics/book/stock-',
                        alt: 'The book cover (front) of Träume eines Mörders by Meike Arend.'},
                    ],
                },
            ],
        },
    ];

    /* src/components/ProjectList.svelte generated by Svelte v3.55.0 */
    const file$e = "src/components/ProjectList.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (38:8) {#each selectedProjects as p}
    function create_each_block$4(ctx) {
    	let li;
    	let a;
    	let figure;
    	let picture;
    	let source;
    	let t0;
    	let img;
    	let img_src_value;
    	let t1;
    	let figcaption;
    	let t2;
    	let t3_value = /*selectedProjects*/ ctx[0].indexOf(/*p*/ ctx[3]) + 1 + "";
    	let t3;
    	let t4;
    	let span;
    	let t5;
    	let t6_value = /*p*/ ctx[3].info.title + "";
    	let t6;
    	let t7;
    	let mounted;
    	let dispose;

    	function mousemove_handler() {
    		return /*mousemove_handler*/ ctx[1](/*p*/ ctx[3]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			figure = element("figure");
    			picture = element("picture");
    			source = element("source");
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			figcaption = element("figcaption");
    			t2 = text("00—");
    			t3 = text(t3_value);
    			t4 = text("  ");
    			span = element("span");
    			t5 = text("|  ");
    			t6 = text(t6_value);
    			t7 = space();
    			attr_dev(source, "type", "image/webp");
    			attr_dev(source, "srcset", "\n                                    " + /*p*/ ctx[3].preview.url + "360.webp 360w, \n                                    " + /*p*/ ctx[3].preview.url + "576.webp 576w, \n                                    " + /*p*/ ctx[3].preview.url + "720.webp 720w,\n                                    " + /*p*/ ctx[3].preview.url + "1440.webp 1440w,\n                                    " + /*p*/ ctx[3].preview.url + "2880.webp 2880w\n                                ");
    			add_location(source, file$e, 46, 28, 1674);
    			attr_dev(img, "fetchpriority", "low");
    			attr_dev(img, "decoding", "async");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "sizes", "\n                                    (max-width: 749px) 100vw, \n                                    (max-width: 1239px) 50vw,\n                                    (max-width: 1520px) 30vw, \n                                    295px\n                                ");
    			attr_dev(img, "srcset", "\n                                    " + /*p*/ ctx[3].preview.url + "360.jpg 360w, \n                                    " + /*p*/ ctx[3].preview.url + "576.jpg 576w, \n                                    " + /*p*/ ctx[3].preview.url + "720.jpg 720w,\n                                    " + /*p*/ ctx[3].preview.url + "1440.jpg 1440w,\n                                    " + /*p*/ ctx[3].preview.url + "2880.jpg 2880w\n                                ");
    			if (!src_url_equal(img.src, img_src_value = "" + (/*p*/ ctx[3].preview.url + "360.jpg"))) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*p*/ ctx[3].preview.imgAlt);
    			attr_dev(img, "class", "svelte-5wx4mz");
    			add_location(img, file$e, 56, 28, 2203);
    			attr_dev(picture, "class", "svelte-5wx4mz");
    			add_location(picture, file$e, 45, 24, 1636);
    			attr_dev(span, "class", "txt-p txt-greyLight svelte-5wx4mz");
    			add_location(span, file$e, 78, 80, 3388);
    			attr_dev(figcaption, "class", "txt-p txt-black svelte-5wx4mz");
    			add_location(figcaption, file$e, 77, 24, 3271);
    			attr_dev(figure, "class", "svelte-5wx4mz");
    			add_location(figure, file$e, 44, 20, 1603);
    			attr_dev(a, "href", `/projects/${/*p*/ ctx[3].info.path}`);
    			attr_dev(a, "aria-label", /*p*/ ctx[3].info.title);
    			attr_dev(a, "class", "svelte-5wx4mz");
    			add_location(a, file$e, 43, 16, 1510);
    			attr_dev(li, "id", "proj-" + /*selectedProjects*/ ctx[0].indexOf(/*p*/ ctx[3]));
    			attr_dev(li, "class", "svelte-5wx4mz");
    			add_location(li, file$e, 38, 12, 1233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, figure);
    			append_dev(figure, picture);
    			append_dev(picture, source);
    			append_dev(picture, t0);
    			append_dev(picture, img);
    			append_dev(figure, t1);
    			append_dev(figure, figcaption);
    			append_dev(figcaption, t2);
    			append_dev(figcaption, t3);
    			append_dev(figcaption, t4);
    			append_dev(figcaption, span);
    			append_dev(span, t5);
    			append_dev(span, t6);
    			append_dev(li, t7);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(link.call(null, a)),
    					listen_dev(li, "mousemove", mousemove_handler, false, false, false),
    					listen_dev(li, "mouseleave", /*mouseleave_handler*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(38:8) {#each selectedProjects as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let section;
    	let header;
    	let h2;
    	let t1;
    	let span;
    	let t3;
    	let a;
    	let t5;
    	let ul;
    	let mounted;
    	let dispose;
    	let each_value = /*selectedProjects*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			h2 = element("h2");
    			h2.textContent = "Projects";
    			t1 = space();
    			span = element("span");
    			span.textContent = "|";
    			t3 = space();
    			a = element("a");
    			a.textContent = "See more";
    			t5 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "txt-p txt-black");
    			add_location(h2, file$e, 31, 8, 974);
    			attr_dev(span, "class", "txt-p txt-black");
    			add_location(span, file$e, 32, 8, 1024);
    			attr_dev(a, "class", "txt-p");
    			attr_dev(a, "href", "/projects");
    			attr_dev(a, "aria-label", "Go to all projects");
    			add_location(a, file$e, 33, 8, 1071);
    			attr_dev(header, "class", "svelte-5wx4mz");
    			add_location(header, file$e, 30, 4, 957);
    			attr_dev(ul, "class", "svelte-5wx4mz");
    			add_location(ul, file$e, 36, 4, 1178);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-5wx4mz");
    			add_location(section, file$e, 28, 0, 905);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, h2);
    			append_dev(header, t1);
    			append_dev(header, span);
    			append_dev(header, t3);
    			append_dev(header, a);
    			append_dev(section, t5);
    			append_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (!mounted) {
    				dispose = action_destroyer(link.call(null, a));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selectedProjects, updateAngle, event, resetAngle*/ 1) {
    				each_value = /*selectedProjects*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function updateAngle(cx, cy, i) {
    	const rec = document.getElementById('proj-' + String(i)).getBoundingClientRect();
    	const x = cx - rec.left;
    	const y = cy - rec.top;
    	const xc = rec.width / 2;
    	const yc = rec.height / 2;
    	const dx = x - xc;
    	const dy = y - yc;
    	const el = document.getElementById('proj-' + String(i)).style;
    	el.setProperty('--rx', `${dy / -10}deg`);
    	el.setProperty('--ry', `${dx / 5}deg`);
    }

    function resetAngle(e) {
    	const el = document.getElementById(e).style;
    	el.setProperty('--ty', '0');
    	el.setProperty('--rx', '0');
    	el.setProperty('--ry', '0');
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectList', slots, []);
    	let selectedProjects = projects.slice(0, 4);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectList> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = p => {
    		updateAngle(event.clientX, event.clientY, selectedProjects.indexOf(p));
    	};

    	const mouseleave_handler = () => {
    		resetAngle(event.srcElement.id);
    	};

    	$$self.$capture_state = () => ({
    		projects,
    		link,
    		selectedProjects,
    		updateAngle,
    		resetAngle
    	});

    	$$self.$inject_state = $$props => {
    		if ('selectedProjects' in $$props) $$invalidate(0, selectedProjects = $$props.selectedProjects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [selectedProjects, mousemove_handler, mouseleave_handler];
    }

    class ProjectList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectList",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src/components/Intro2D.svelte generated by Svelte v3.55.0 */
    const file$d = "src/components/Intro2D.svelte";

    function create_fragment$d(ctx) {
    	let section;
    	let div10;
    	let div4;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div9;
    	let div5;
    	let t4;
    	let div6;
    	let t5;
    	let div7;
    	let t6;
    	let div8;
    	let div10_intro;
    	let t7;
    	let div11;
    	let t8;
    	let h1;
    	let t9;
    	let span0;
    	let br;
    	let span1;
    	let t10;
    	let h1_intro;
    	let section_resize_listener;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div10 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div9 = element("div");
    			div5 = element("div");
    			t4 = space();
    			div6 = element("div");
    			t5 = space();
    			div7 = element("div");
    			t6 = space();
    			div8 = element("div");
    			t7 = space();
    			div11 = element("div");
    			t8 = space();
    			h1 = element("h1");
    			t9 = text("Turning ideas\n        ");
    			span0 = element("span");
    			br = element("br");
    			span1 = element("span");
    			t10 = text("\n        into reality");
    			attr_dev(div0, "id", "c-1");
    			attr_dev(div0, "class", "circle svelte-11ygs2m");
    			add_location(div0, file$d, 21, 12, 796);
    			attr_dev(div1, "id", "c-2");
    			attr_dev(div1, "class", "circle svelte-11ygs2m");
    			add_location(div1, file$d, 22, 12, 844);
    			attr_dev(div2, "id", "c-3");
    			attr_dev(div2, "class", "circle svelte-11ygs2m");
    			add_location(div2, file$d, 23, 12, 892);
    			attr_dev(div3, "id", "c-4");
    			attr_dev(div3, "class", "circle svelte-11ygs2m");
    			add_location(div3, file$d, 24, 12, 940);
    			attr_dev(div4, "id", "cw-1");
    			attr_dev(div4, "class", "circle-wrapper svelte-11ygs2m");
    			add_location(div4, file$d, 20, 8, 745);
    			attr_dev(div5, "id", "c-1");
    			attr_dev(div5, "class", "circle svelte-11ygs2m");
    			add_location(div5, file$d, 27, 12, 1050);
    			attr_dev(div6, "id", "c-2");
    			attr_dev(div6, "class", "circle svelte-11ygs2m");
    			add_location(div6, file$d, 28, 12, 1098);
    			attr_dev(div7, "id", "c-3");
    			attr_dev(div7, "class", "circle svelte-11ygs2m");
    			add_location(div7, file$d, 29, 12, 1146);
    			attr_dev(div8, "id", "c-4");
    			attr_dev(div8, "class", "circle svelte-11ygs2m");
    			add_location(div8, file$d, 30, 12, 1194);
    			attr_dev(div9, "id", "cw-2");
    			attr_dev(div9, "class", "circle-wrapper svelte-11ygs2m");
    			add_location(div9, file$d, 26, 8, 999);
    			attr_dev(div10, "class", "container svelte-11ygs2m");
    			add_location(div10, file$d, 19, 4, 705);
    			attr_dev(div11, "class", "blur svelte-11ygs2m");
    			add_location(div11, file$d, 33, 4, 1260);
    			attr_dev(span0, "id", "bar-1");
    			attr_dev(span0, "class", "svelte-11ygs2m");
    			add_location(span0, file$d, 36, 8, 1413);
    			add_location(br, file$d, 36, 32, 1437);
    			attr_dev(span1, "id", "bar-2");
    			attr_dev(span1, "class", "svelte-11ygs2m");
    			add_location(span1, file$d, 36, 36, 1441);
    			attr_dev(h1, "class", "txt-h txt-black svelte-11ygs2m");
    			add_location(h1, file$d, 34, 4, 1289);
    			attr_dev(section, "class", "intro-wrapper bg-default svelte-11ygs2m");
    			add_render_callback(() => /*section_elementresize_handler*/ ctx[3].call(section));
    			add_location(section, file$d, 18, 0, 590);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div10);
    			append_dev(div10, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div1);
    			append_dev(div4, t1);
    			append_dev(div4, div2);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div10, t3);
    			append_dev(div10, div9);
    			append_dev(div9, div5);
    			append_dev(div9, t4);
    			append_dev(div9, div6);
    			append_dev(div9, t5);
    			append_dev(div9, div7);
    			append_dev(div9, t6);
    			append_dev(div9, div8);
    			append_dev(section, t7);
    			append_dev(section, div11);
    			append_dev(section, t8);
    			append_dev(section, h1);
    			append_dev(h1, t9);
    			append_dev(h1, span0);
    			append_dev(h1, br);
    			append_dev(h1, span1);
    			append_dev(h1, t10);
    			section_resize_listener = add_resize_listener(section, /*section_elementresize_handler*/ ctx[3].bind(section));

    			if (!mounted) {
    				dispose = listen_dev(section, "mousemove", /*updateLoc*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!div10_intro) {
    				add_render_callback(() => {
    					div10_intro = create_in_transition(div10, fade, {});
    					div10_intro.start();
    				});
    			}

    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, fly, {
    						delay: 300,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					h1_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			section_resize_listener();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro2D', slots, []);
    	let m = { x: 0, y: 0 };
    	let h;
    	let w;

    	function updateLoc(event) {
    		m.x = event.clientX;
    		m.y = event.clientY;
    		document.getElementById('cw-1').style.top = String(44 + 4 * (m.y / h) + '%');
    		document.getElementById('cw-1').style.left = String(4 + 4 * (m.x / w) + '%');
    		document.getElementById('cw-2').style.top = String(12 + 4 * (m.y / h) + '%');
    		document.getElementById('cw-2').style.right = String(12 + 4 * (m.x / w) + '%');
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro2D> was created with unknown prop '${key}'`);
    	});

    	function section_elementresize_handler() {
    		w = this.clientWidth;
    		h = this.clientHeight;
    		$$invalidate(1, w);
    		$$invalidate(0, h);
    	}

    	$$self.$capture_state = () => ({ fly, fade, m, h, w, updateLoc });

    	$$self.$inject_state = $$props => {
    		if ('m' in $$props) m = $$props.m;
    		if ('h' in $$props) $$invalidate(0, h = $$props.h);
    		if ('w' in $$props) $$invalidate(1, w = $$props.w);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [h, w, updateLoc, section_elementresize_handler];
    }

    class Intro2D extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro2D",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.55.0 */
    const file$c = "src/pages/Home.svelte";

    function create_fragment$c(ctx) {
    	let t0;
    	let div;
    	let nav;
    	let t1;
    	let intro2d;
    	let t2;
    	let statement;
    	let t3;
    	let projectlist;
    	let t4;
    	let services;
    	let t5;
    	let footer;
    	let current;

    	nav = new Nav({
    			props: { active: "home" },
    			$$inline: true
    		});

    	intro2d = new Intro2D({ $$inline: true });

    	statement = new Statement({
    			props: {
    				title: "Brands",
    				subtitle: "2013 — 2023",
    				body: "8fit, Allianz, Alva Labs, Audi, BMW, Bosch, Electrolux, Eon, Futurice, Global Child Forum, Gofore, Jagex, MAN, Stora Enso, Tado, Vitafy"
    			},
    			$$inline: true
    		});

    	projectlist = new ProjectList({ $$inline: true });
    	services = new Services({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			create_component(nav.$$.fragment);
    			t1 = space();
    			create_component(intro2d.$$.fragment);
    			t2 = space();
    			create_component(statement.$$.fragment);
    			t3 = space();
    			create_component(projectlist.$$.fragment);
    			t4 = space();
    			create_component(services.$$.fragment);
    			t5 = space();
    			create_component(footer.$$.fragment);
    			document.title = "Marc Biemer";
    			attr_dev(div, "class", "nav-wrapper");
    			add_location(div, file$c, 21, 0, 608);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(nav, div, null);
    			insert_dev(target, t1, anchor);
    			mount_component(intro2d, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(statement, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(projectlist, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(services, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(intro2d.$$.fragment, local);
    			transition_in(statement.$$.fragment, local);
    			transition_in(projectlist.$$.fragment, local);
    			transition_in(services.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(intro2d.$$.fragment, local);
    			transition_out(statement.$$.fragment, local);
    			transition_out(projectlist.$$.fragment, local);
    			transition_out(services.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(nav);
    			if (detaching) detach_dev(t1);
    			destroy_component(intro2d, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(statement, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(projectlist, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(services, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Nav,
    		Footer,
    		Statement,
    		Services,
    		ProjectList,
    		Intro2D
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/components/about/Bio.svelte generated by Svelte v3.55.0 */
    const file$b = "src/components/about/Bio.svelte";

    function create_fragment$b(ctx) {
    	let section;
    	let div0;
    	let h1;
    	let t0_value = /*name*/ ctx[0][0] + "";
    	let t0;
    	let br;
    	let t1_value = /*name*/ ctx[0][1] + "";
    	let t1;
    	let t2;
    	let h1_intro;
    	let t3;
    	let p;
    	let p_intro;
    	let t5;
    	let div2;
    	let div1;
    	let span0;
    	let t9;
    	let span1;
    	let t11;
    	let figure;
    	let picture;
    	let source;
    	let t12;
    	let img;
    	let img_src_value;
    	let t13;
    	let figcaption;
    	let div2_intro;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			br = element("br");
    			t1 = text(t1_value);
    			t2 = text(" ©");
    			t3 = space();
    			p = element("p");
    			p.textContent = `${/*intro*/ ctx[1]}`;
    			t5 = space();
    			div2 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = `${/*loc*/ ctx[3]}: ${/*year*/ ctx[2]}`;
    			t9 = space();
    			span1 = element("span");
    			span1.textContent = `${/*c*/ ctx[4]}`;
    			t11 = space();
    			figure = element("figure");
    			picture = element("picture");
    			source = element("source");
    			t12 = space();
    			img = element("img");
    			t13 = space();
    			figcaption = element("figcaption");
    			figcaption.textContent = "Portrait shot of Marc Biemer, 2021";
    			add_location(br, file$b, 14, 110, 566);
    			attr_dev(h1, "class", "txt-h txt-black svelte-84mng2");
    			add_location(h1, file$b, 14, 8, 464);
    			attr_dev(p, "class", "txt-p txt-grey svelte-84mng2");
    			add_location(p, file$b, 15, 8, 600);
    			attr_dev(div0, "class", "header svelte-84mng2");
    			add_location(div0, file$b, 13, 4, 434);
    			attr_dev(span0, "class", "text-p txt-black");
    			add_location(span0, file$b, 19, 12, 846);
    			attr_dev(span1, "class", "text-p txt-black count svelte-84mng2");
    			add_location(span1, file$b, 20, 12, 910);
    			attr_dev(div1, "class", "specs svelte-84mng2");
    			add_location(div1, file$b, 18, 8, 814);
    			attr_dev(source, "type", "image/webp");
    			attr_dev(source, "srcset", "\n                        " + /*src*/ ctx[5] + "_485.webp 485w, \n                        " + /*src*/ ctx[5] + "_717.webp 717w,\n                        " + /*src*/ ctx[5] + "_970.webp 970w,\n                        " + /*src*/ ctx[5] + "_1067.webp 1067w,\n                    ");
    			add_location(source, file$b, 24, 16, 1028);
    			attr_dev(img, "fetchpriority", "high");
    			attr_dev(img, "sizes", "(max-width: 749px) calc(100vw - 32px), 485px");
    			attr_dev(img, "srcset", "\n                        " + /*src*/ ctx[5] + "_485.jpg 485w, \n                        " + /*src*/ ctx[5] + "_717.jpg 717w,\n                        " + /*src*/ ctx[5] + "_970.jpg 970w,\n                        " + /*src*/ ctx[5] + "_1067.jpg 1067w,\n                    ");
    			if (!src_url_equal(img.src, img_src_value = "" + (/*src*/ ctx[5] + "485.jpg"))) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Portrait of Marc from 2021, a man in his 20s wearing a black t-shirt sitting in a window frame.");
    			attr_dev(img, "class", "svelte-84mng2");
    			add_location(img, file$b, 33, 16, 1337);
    			add_location(picture, file$b, 23, 12, 1002);
    			attr_dev(figcaption, "class", "screenreader-only");
    			add_location(figcaption, file$b, 46, 12, 1901);
    			attr_dev(figure, "class", "svelte-84mng2");
    			add_location(figure, file$b, 22, 8, 981);
    			attr_dev(div2, "class", "portrait svelte-84mng2");
    			add_location(div2, file$b, 17, 4, 718);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-84mng2");
    			add_location(section, file$b, 12, 0, 387);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, br);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    			append_dev(section, t5);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t9);
    			append_dev(div1, span1);
    			append_dev(div2, t11);
    			append_dev(div2, figure);
    			append_dev(figure, picture);
    			append_dev(picture, source);
    			append_dev(picture, t12);
    			append_dev(picture, img);
    			append_dev(figure, t13);
    			append_dev(figure, figcaption);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, fly, {
    						delay: 300,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					h1_intro.start();
    				});
    			}

    			if (!p_intro) {
    				add_render_callback(() => {
    					p_intro = create_in_transition(p, fly, {
    						delay: 150,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					p_intro.start();
    				});
    			}

    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fly, {
    						delay: 450,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					div2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Bio', slots, []);
    	let name = ['Marc', 'Biemer'];
    	let intro = "I'm a digital designer, researcher, and XR creator with over 7 years’ experience and a master’s degree in Cognitive Systems & Interactive Media.";
    	let year = 2021;
    	let loc = 'Stockholm';
    	let c = '03';
    	let src = 'images/profile/profile';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bio> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ name, intro, year, loc, c, src, fly });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('intro' in $$props) $$invalidate(1, intro = $$props.intro);
    		if ('year' in $$props) $$invalidate(2, year = $$props.year);
    		if ('loc' in $$props) $$invalidate(3, loc = $$props.loc);
    		if ('c' in $$props) $$invalidate(4, c = $$props.c);
    		if ('src' in $$props) $$invalidate(5, src = $$props.src);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, intro, year, loc, c, src];
    }

    class Bio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bio",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/about/List.svelte generated by Svelte v3.55.0 */

    const file$a = "src/components/about/List.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (12:16) {#if item.span != undefined}
    function create_if_block_3$1(ctx) {
    	let t0;
    	let t1_value = /*item*/ ctx[2].span + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("(");
    			t1 = text(t1_value);
    			t2 = text(")");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 2 && t1_value !== (t1_value = /*item*/ ctx[2].span + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(12:16) {#if item.span != undefined}",
    		ctx
    	});

    	return block;
    }

    // (25:12) {:else}
    function create_else_block_1(ctx) {
    	let p;
    	let t_value = /*item*/ ctx[2].sub + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "txt-p txt-grey svelte-1ymirgk");
    			add_location(p, file$a, 25, 16, 877);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 2 && t_value !== (t_value = /*item*/ ctx[2].sub + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(25:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (17:12) {#if item.stages != undefined}
    function create_if_block_1$1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*item*/ ctx[2].stages;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content, undefined*/ 2) {
    				each_value_1 = /*item*/ ctx[2].stages;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(17:12) {#if item.stages != undefined}",
    		ctx
    	});

    	return block;
    }

    // (21:20) {:else}
    function create_else_block$1(ctx) {
    	let p;
    	let t0_value = /*stage*/ ctx[5].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*stage*/ ctx[5].loc + "";
    	let t2;
    	let t3;
    	let t4_value = /*stage*/ ctx[5].year + "";
    	let t4;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(", ");
    			t2 = text(t2_value);
    			t3 = text(" ");
    			t4 = text(t4_value);
    			attr_dev(p, "class", "txt-p txt-grey svelte-1ymirgk");
    			add_location(p, file$a, 21, 24, 712);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 2 && t0_value !== (t0_value = /*stage*/ ctx[5].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*content*/ 2 && t2_value !== (t2_value = /*stage*/ ctx[5].loc + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*content*/ 2 && t4_value !== (t4_value = /*stage*/ ctx[5].year + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(21:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (19:20) {#if stage.url != undefined}
    function create_if_block_2$1(ctx) {
    	let a;
    	let t0_value = /*stage*/ ctx[5].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*stage*/ ctx[5].loc + "";
    	let t2;
    	let t3;
    	let t4_value = /*stage*/ ctx[5].year + "";
    	let t4;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = text(", ");
    			t2 = text(t2_value);
    			t3 = text(" ");
    			t4 = text(t4_value);
    			attr_dev(a, "href", a_href_value = /*stage*/ ctx[5].url);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noreferrer");
    			attr_dev(a, "class", "txt-p");
    			add_location(a, file$a, 19, 24, 540);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, t2);
    			append_dev(a, t3);
    			append_dev(a, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 2 && t0_value !== (t0_value = /*stage*/ ctx[5].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*content*/ 2 && t2_value !== (t2_value = /*stage*/ ctx[5].loc + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*content*/ 2 && t4_value !== (t4_value = /*stage*/ ctx[5].year + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*content*/ 2 && a_href_value !== (a_href_value = /*stage*/ ctx[5].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(19:20) {#if stage.url != undefined}",
    		ctx
    	});

    	return block;
    }

    // (18:16) {#each item.stages as stage}
    function create_each_block_1$1(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*stage*/ ctx[5].url != undefined) return create_if_block_2$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(18:16) {#each item.stages as stage}",
    		ctx
    	});

    	return block;
    }

    // (9:8) {#each content as item}
    function create_each_block$3(ctx) {
    	let li;
    	let h3;
    	let t0_value = /*item*/ ctx[2].title + "";
    	let t0;
    	let t1;
    	let t2;
    	let if_block0 = /*item*/ ctx[2].span != undefined && create_if_block_3$1(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*item*/ ctx[2].stages != undefined) return create_if_block_1$1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if_block1.c();
    			attr_dev(h3, "class", "txt-p txt-black svelte-1ymirgk");
    			add_location(h3, file$a, 10, 12, 218);
    			attr_dev(li, "class", "svelte-1ymirgk");
    			add_location(li, file$a, 9, 8, 201);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			if (if_block0) if_block0.m(h3, null);
    			append_dev(li, t2);
    			if_block1.m(li, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 2 && t0_value !== (t0_value = /*item*/ ctx[2].title + "")) set_data_dev(t0, t0_value);

    			if (/*item*/ ctx[2].span != undefined) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					if_block0.m(h3, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(li, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(9:8) {#each content as item}",
    		ctx
    	});

    	return block;
    }

    // (30:8) {#if type == 'Work'}
    function create_if_block$1(ctx) {
    	let div;
    	let a;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			a.textContent = "LinkedIn";
    			attr_dev(a, "href", "https://www.linkedin.com/in/marcbiemer");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noreferrer");
    			add_location(a, file$a, 31, 16, 1050);
    			attr_dev(div, "class", "social txt-p svelte-1ymirgk");
    			add_location(div, file$a, 30, 12, 1007);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(30:8) {#if type == 'Work'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let ol;
    	let t2;
    	let each_value = /*content*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	let if_block = /*type*/ ctx[0] == 'Work' && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(/*type*/ ctx[0]);
    			t1 = space();
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(h2, "class", "txt-p txt-black svelte-1ymirgk");
    			add_location(h2, file$a, 6, 4, 112);
    			attr_dev(ol, "class", "svelte-1ymirgk");
    			add_location(ol, file$a, 7, 4, 156);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-1ymirgk");
    			add_location(section, file$a, 5, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(section, t1);
    			append_dev(section, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			append_dev(ol, t2);
    			if (if_block) if_block.m(ol, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type*/ 1) set_data_dev(t0, /*type*/ ctx[0]);

    			if (dirty & /*content, undefined*/ 2) {
    				each_value = /*content*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*type*/ ctx[0] == 'Work') {
    				if (if_block) ; else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(ol, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, []);
    	let { type } = $$props;
    	let { content } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (type === undefined && !('type' in $$props || $$self.$$.bound[$$self.$$.props['type']])) {
    			console.warn("<List> was created without expected prop 'type'");
    		}

    		if (content === undefined && !('content' in $$props || $$self.$$.bound[$$self.$$.props['content']])) {
    			console.warn("<List> was created without expected prop 'content'");
    		}
    	});

    	const writable_props = ['type', 'content'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<List> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('content' in $$props) $$invalidate(1, content = $$props.content);
    	};

    	$$self.$capture_state = () => ({ type, content });

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('content' in $$props) $$invalidate(1, content = $$props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, content];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { type: 0, content: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get type() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/Info.svelte generated by Svelte v3.55.0 */
    const file$9 = "src/pages/Info.svelte";

    function create_fragment$9(ctx) {
    	let t0;
    	let nav;
    	let t1;
    	let article;
    	let bio;
    	let t2;
    	let list0;
    	let t3;
    	let list1;
    	let t4;
    	let list2;
    	let t5;
    	let footer;
    	let current;

    	nav = new Nav({
    			props: { active: "info" },
    			$$inline: true
    		});

    	bio = new Bio({ $$inline: true });

    	list0 = new List({
    			props: {
    				type: "Work",
    				content: /*workExp*/ ctx[0]
    			},
    			$$inline: true
    		});

    	list1 = new List({
    			props: {
    				type: "Lecturing",
    				content: /*lecExp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	list2 = new List({
    			props: {
    				type: "Speaking",
    				content: /*speExp*/ ctx[2]
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			create_component(nav.$$.fragment);
    			t1 = space();
    			article = element("article");
    			create_component(bio.$$.fragment);
    			t2 = space();
    			create_component(list0.$$.fragment);
    			t3 = space();
    			create_component(list1.$$.fragment);
    			t4 = space();
    			create_component(list2.$$.fragment);
    			t5 = space();
    			create_component(footer.$$.fragment);
    			document.title = "Marc Biemer — Info";
    			add_location(article, file$9, 103, 0, 3381);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, article, anchor);
    			mount_component(bio, article, null);
    			append_dev(article, t2);
    			mount_component(list0, article, null);
    			append_dev(article, t3);
    			mount_component(list1, article, null);
    			append_dev(article, t4);
    			mount_component(list2, article, null);
    			insert_dev(target, t5, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(bio.$$.fragment, local);
    			transition_in(list0.$$.fragment, local);
    			transition_in(list1.$$.fragment, local);
    			transition_in(list2.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(bio.$$.fragment, local);
    			transition_out(list0.$$.fragment, local);
    			transition_out(list1.$$.fragment, local);
    			transition_out(list2.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(article);
    			destroy_component(bio);
    			destroy_component(list0);
    			destroy_component(list1);
    			destroy_component(list2);
    			if (detaching) detach_dev(t5);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Info', slots, []);

    	let workExp = [
    		{
    			title: 'Senior Product Designer',
    			span: 'Aug 22 – Present',
    			sub: 'Alva Labs, Stockholm'
    		},
    		{
    			title: 'Senior Digital Product Designer',
    			span: 'Feb 21 – Jul 22',
    			sub: 'Futurice, Stockholm'
    		},
    		{
    			title: 'Designer',
    			span: 'May 18 – Jun 19',
    			sub: 'Futurice, Munich'
    		},
    		{
    			title: 'UX Designer',
    			span: 'Jan 18 – Apr 18',
    			sub: 'Gofore, Munich'
    		},
    		{
    			title: 'Junior UX Designer',
    			span: 'Oct 16 – Dec 17',
    			sub: 'Vitafy, Munich'
    		},
    		{
    			title: 'Corporate Student Market Research',
    			span: 'Oct 13 – Sep 16',
    			sub: 'Bosch, Stuttgart'
    		}
    	];

    	let lecExp = [
    		{
    			title: 'Business Development',
    			span: '2022 – Present',
    			sub: 'DHBW, Karlsruhe'
    		},
    		{
    			title: 'Lean Business Model Creation',
    			span: '2022 – Present',
    			sub: 'DHBW, Mosbach'
    		},
    		{
    			title: 'Hack Design',
    			span: '2021 – Present',
    			sub: 'Hyper Island, Stockholm'
    		},
    		{
    			title: 'UX Design for Extended-Reality Applications',
    			span: '2022',
    			sub: 'Hyper Island, Stockholm'
    		},
    		{
    			title: 'Business Model Innovation',
    			span: '2021',
    			sub: 'DHBW, Heilbronn'
    		},
    		{
    			title: 'IoT Platforms for Industry 4.0',
    			span: '2018',
    			sub: 'TUM/eit-Digital Summer School, Munich'
    		}
    	];

    	let speExp = [
    		{
    			title: 'Designing a Mixed Reality Game Experience to foster Social Initiation in Children with Autism',
    			stages: [
    				{
    					name: 'Code.Talks',
    					loc: 'Hamburg',
    					year: '2022',
    					url: 'https://www.youtube.com/watch?v=mwWKOxKU0xc'
    				},
    				{
    					name: 'Intersection',
    					loc: 'Turin',
    					year: '2022',
    					url: 'https://www.youtube.com/watch?v=jW2XCKApE8s'
    				},
    				{
    					name: 'Push UX',
    					loc: 'Munich',
    					year: '2021'
    				}
    			]
    		},
    		{
    			title: 'Transparency by design: Turning data into design and dark patterns in design',
    			stages: [
    				{
    					name: 'Data Natives',
    					loc: 'Berlin',
    					year: '2022'
    				}
    			]
    		},
    		{
    			title: 'Data Portraits: Turning Data into Design',
    			stages: [
    				{
    					name: 'WeAreDevelopers World Congress',
    					loc: 'Berlin',
    					year: '2022'
    				},
    				{
    					name: 'Uppstart',
    					loc: 'Stockholm',
    					year: '2021',
    					url: 'https://www.youtube.com/watch?v=0AFKj3Iug3I'
    				}
    			]
    		},
    		{
    			title: 'The occupational profile of Digital Accessibility Professionals',
    			stages: [
    				{
    					name: 'IAAP Panel Discussion',
    					loc: 'remote',
    					year: '2021'
    				}
    			]
    		},
    		{
    			title: 'Co-Founder, Host & Speaker',
    			stages: [
    				{
    					name: 'Munich Accessibility Meetup',
    					loc: 'Munich',
    					year: '2018-21',
    					url: 'https://twitter.com/a11ymuc'
    				}
    			]
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Nav,
    		Footer,
    		Bio,
    		List,
    		workExp,
    		lecExp,
    		speExp
    	});

    	$$self.$inject_state = $$props => {
    		if ('workExp' in $$props) $$invalidate(0, workExp = $$props.workExp);
    		if ('lecExp' in $$props) $$invalidate(1, lecExp = $$props.lecExp);
    		if ('speExp' in $$props) $$invalidate(2, speExp = $$props.speExp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [workExp, lecExp, speExp];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/pages/Projects.svelte generated by Svelte v3.55.0 */

    const { document: document_1 } = globals;

    const file$8 = "src/pages/Projects.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	return child_ctx;
    }

    // (166:32) {#each p.info.con as con}
    function create_each_block_2(ctx) {
    	let li;
    	let t_value = /*con*/ ctx[19] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "txt-p txt-black svelte-z0nxuu");
    			add_location(li, file$8, 166, 36, 6566);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(166:32) {#each p.info.con as con}",
    		ctx
    	});

    	return block;
    }

    // (117:16) {#each projects as p}
    function create_each_block_1(ctx) {
    	let a;
    	let div0;
    	let picture;
    	let source;
    	let t0;
    	let img;
    	let img_fetchpriority_value;
    	let img_decoding_value;
    	let img_loading_value;
    	let img_src_value;
    	let t1;
    	let div2;
    	let div1;
    	let h1;
    	let t2_value = /*p*/ ctx[14].info.title + "";
    	let t2;
    	let t3;
    	let p;
    	let span0;
    	let t4;
    	let t5_value = projects.indexOf(/*p*/ ctx[14]) + 1 + "";
    	let t5;
    	let span1;
    	let t6_value = /*p*/ ctx[14].info.year + "";
    	let t6;
    	let t7;
    	let ul;
    	let t8;
    	let a_class_value;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*p*/ ctx[14].info.con;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			div0 = element("div");
    			picture = element("picture");
    			source = element("source");
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			t2 = text(t2_value);
    			t3 = space();
    			p = element("p");
    			span0 = element("span");
    			t4 = text("00—");
    			t5 = text(t5_value);
    			span1 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			attr_dev(source, "type", "image/webp");
    			attr_dev(source, "srcset", "\n                                        " + /*p*/ ctx[14].preview.url + "360.webp 360w, \n                                        " + /*p*/ ctx[14].preview.url + "576.webp 576w, \n                                        " + /*p*/ ctx[14].preview.url + "720.webp 720w,\n                                        " + /*p*/ ctx[14].preview.url + "1440.webp 1440w,\n                                        " + /*p*/ ctx[14].preview.url + "2880.webp 2880w\n                                    ");
    			add_location(source, file$8, 126, 32, 4003);
    			attr_dev(img, "role", "presentation");

    			attr_dev(img, "fetchpriority", img_fetchpriority_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? "high"
    			: "low");

    			attr_dev(img, "decoding", img_decoding_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? ""
    			: "async");

    			attr_dev(img, "loading", img_loading_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? ""
    			: "lazy");

    			set_style(img, "width", "100%");
    			set_style(img, "height", "100%");
    			set_style(img, "object-fit", "cover");
    			attr_dev(img, "sizes", "\n                                        (max-width: 749px) calc(100vw - 32px),\n                                        (max-width: 1519px) calc(100vw - 80px),\n                                        1440px\n                                    ");
    			attr_dev(img, "srcset", "\n                                        " + /*p*/ ctx[14].preview.url + "360.jpg 360w,\n                                        " + /*p*/ ctx[14].preview.url + "576.jpg 576w,\n                                        " + /*p*/ ctx[14].preview.url + "720.jpg 720w,\n                                        " + /*p*/ ctx[14].preview.url + "1440.jpg 1440w,\n                                        " + /*p*/ ctx[14].preview.url + "2880.jpg 2880w\n                                    ");
    			if (!src_url_equal(img.src, img_src_value = "" + (/*p*/ ctx[14].preview.url + "360.jpg"))) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*p*/ ctx[14].preview.imgAlt);
    			add_location(img, file$8, 136, 32, 4564);
    			attr_dev(picture, "class", "slide-image svelte-z0nxuu");
    			add_location(picture, file$8, 125, 28, 3941);
    			attr_dev(div0, "class", "abs-mask svelte-z0nxuu");
    			add_location(div0, file$8, 124, 24, 3890);
    			attr_dev(h1, "class", "txt-h txt-black");
    			add_location(h1, file$8, 161, 32, 6190);
    			attr_dev(span0, "class", "svelte-z0nxuu");
    			add_location(span0, file$8, 162, 64, 6302);
    			attr_dev(span1, "class", "svelte-z0nxuu");
    			add_location(span1, file$8, 162, 111, 6349);
    			attr_dev(p, "class", "txt-p txt-black year svelte-z0nxuu");
    			add_location(p, file$8, 162, 32, 6270);
    			attr_dev(div1, "class", "title-wrapper svelte-z0nxuu");
    			add_location(div1, file$8, 160, 28, 6130);
    			attr_dev(ul, "class", "con-wrapper svelte-z0nxuu");
    			add_location(ul, file$8, 164, 28, 6447);
    			attr_dev(div2, "class", "slide-title svelte-z0nxuu");
    			attr_dev(div2, "data-index", projects.indexOf(/*p*/ ctx[14]));
    			add_location(div2, file$8, 159, 24, 6043);
    			attr_dev(a, "href", `/projects/${/*p*/ ctx[14].info.path}`);

    			attr_dev(a, "class", a_class_value = "" + (null_to_empty(/*iCurrent*/ ctx[0] == projects.indexOf(/*p*/ ctx[14])
    			? "slide active bg-default"
    			: /*iPrev*/ ctx[1] == projects.indexOf(/*p*/ ctx[14])
    				? "slide prev bg-default"
    				: /*iNext*/ ctx[2] == projects.indexOf(/*p*/ ctx[14])
    					? "slide next bg-default"
    					: "slide bg-default") + " svelte-z0nxuu"));

    			attr_dev(a, "data-index", projects.indexOf(/*p*/ ctx[14]));
    			add_location(a, file$8, 117, 20, 3417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div0);
    			append_dev(div0, picture);
    			append_dev(picture, source);
    			append_dev(picture, t0);
    			append_dev(picture, img);
    			append_dev(a, t1);
    			append_dev(a, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, p);
    			append_dev(p, span0);
    			append_dev(span0, t4);
    			append_dev(span0, t5);
    			append_dev(p, span1);
    			append_dev(span1, t6);
    			append_dev(div2, t7);
    			append_dev(div2, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(a, t8);

    			if (!mounted) {
    				dispose = action_destroyer(link.call(null, a));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*iPrev, iCurrent, iNext*/ 7 && img_fetchpriority_value !== (img_fetchpriority_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? "high"
    			: "low")) {
    				attr_dev(img, "fetchpriority", img_fetchpriority_value);
    			}

    			if (dirty & /*iPrev, iCurrent, iNext*/ 7 && img_decoding_value !== (img_decoding_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? ""
    			: "async")) {
    				attr_dev(img, "decoding", img_decoding_value);
    			}

    			if (dirty & /*iPrev, iCurrent, iNext*/ 7 && img_loading_value !== (img_loading_value = [/*iPrev*/ ctx[1], /*iCurrent*/ ctx[0], /*iNext*/ ctx[2]].includes(projects.indexOf(/*p*/ ctx[14]))
    			? ""
    			: "lazy")) {
    				attr_dev(img, "loading", img_loading_value);
    			}

    			if (dirty & /*projects*/ 0) {
    				each_value_2 = /*p*/ ctx[14].info.con;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			if (dirty & /*iCurrent, iPrev, iNext*/ 7 && a_class_value !== (a_class_value = "" + (null_to_empty(/*iCurrent*/ ctx[0] == projects.indexOf(/*p*/ ctx[14])
    			? "slide active bg-default"
    			: /*iPrev*/ ctx[1] == projects.indexOf(/*p*/ ctx[14])
    				? "slide prev bg-default"
    				: /*iNext*/ ctx[2] == projects.indexOf(/*p*/ ctx[14])
    					? "slide next bg-default"
    					: "slide bg-default") + " svelte-z0nxuu"))) {
    				attr_dev(a, "class", a_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(117:16) {#each projects as p}",
    		ctx
    	});

    	return block;
    }

    // (179:4) {#each projects as p}
    function create_each_block$2(ctx) {
    	let li;
    	let button;
    	let span;
    	let t0;
    	let t1_value = projects.indexOf(/*p*/ ctx[14]) + "";
    	let t1;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[10](/*p*/ ctx[14]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			button = element("button");
    			span = element("span");
    			t0 = text("Show Project ");
    			t1 = text(t1_value);
    			attr_dev(span, "class", "screenreader-only svelte-z0nxuu");
    			add_location(span, file$8, 179, 135, 7035);

    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*iCurrent*/ ctx[0] == projects.indexOf(/*p*/ ctx[14])
    			? 'active'
    			: undefined) + " svelte-z0nxuu"));

    			add_location(button, file$8, 179, 12, 6912);
    			add_location(li, file$8, 179, 8, 6908);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, button);
    			append_dev(button, span);
    			append_dev(span, t0);
    			append_dev(span, t1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*iCurrent*/ 1 && button_class_value !== (button_class_value = "" + (null_to_empty(/*iCurrent*/ ctx[0] == projects.indexOf(/*p*/ ctx[14])
    			? 'active'
    			: undefined) + " svelte-z0nxuu"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(179:4) {#each projects as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let t0;
    	let div4;
    	let div0;
    	let nav0;
    	let t1;
    	let div3;
    	let div2;
    	let div1;
    	let div3_intro;
    	let t2;
    	let nav1;
    	let nav1_intro;
    	let current;
    	let mounted;
    	let dispose;

    	nav0 = new Nav({
    			props: { active: "projects" },
    			$$inline: true
    		});

    	let each_value_1 = projects;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = projects;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div4 = element("div");
    			div0 = element("div");
    			create_component(nav0.$$.fragment);
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			nav1 = element("nav");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			document_1.title = "Marc Biemer — Projects";
    			attr_dev(div0, "class", "nav-wrapper svelte-z0nxuu");
    			add_location(div0, file$8, 110, 4, 3094);
    			attr_dev(div1, "id", "slides-main");
    			attr_dev(div1, "class", "slides svelte-z0nxuu");
    			add_location(div1, file$8, 115, 12, 3321);
    			attr_dev(div2, "id", "slideshow");
    			attr_dev(div2, "class", "svelte-z0nxuu");
    			add_location(div2, file$8, 114, 8, 3288);
    			attr_dev(div3, "id", "hero-slider");
    			attr_dev(div3, "class", "pd-lr max-width svelte-z0nxuu");
    			add_location(div3, file$8, 113, 4, 3168);
    			attr_dev(div4, "class", "projects-wrapper svelte-z0nxuu");
    			add_location(div4, file$8, 109, 0, 3059);
    			attr_dev(nav1, "class", "slider-controls svelte-z0nxuu");
    			add_location(nav1, file$8, 177, 0, 6836);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			mount_component(nav0, div0, null);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div1, null);
    			}

    			insert_dev(target, t2, anchor);
    			insert_dev(target, nav1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(nav1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "wheel", /*wheel_handler*/ ctx[7], false, false, false),
    					listen_dev(window, "touchmove", /*touchmove_handler*/ ctx[8], false, false, false),
    					listen_dev(window, "touchstart", /*touchstart_handler*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects, iCurrent, iPrev, iNext*/ 7) {
    				each_value_1 = projects;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*iCurrent, projects, undefined, updateProject*/ 9) {
    				each_value = projects;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(nav1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav0.$$.fragment, local);

    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fly, {
    						delay: 150,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					div3_intro.start();
    				});
    			}

    			if (!nav1_intro) {
    				add_render_callback(() => {
    					nav1_intro = create_in_transition(nav1, fade, {});
    					nav1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav0.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div4);
    			destroy_component(nav0);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(nav1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);

    	onMount(() => {
    		let body = document.getElementsByTagName('body')[0];
    		body.style.overscrollBehavior = 'none';
    	});

    	onDestroy(() => {
    		let body = document.getElementsByTagName('body')[0];
    		body.style.overscrollBehavior = 'auto';
    	});

    	let iCurrent = 0;
    	let iPrev = projects.length - 1;
    	let iNext = 1;

    	function updateProject(j) {
    		let direction = j - iCurrent;

    		// Handle edges
    		let isLast = iCurrent === projects.length - 1 ? true : false;

    		let isFirst = iCurrent === 0 ? true : false;

    		if (isLast && j === 0) {
    			direction = 1;
    		} else if (isFirst && j === projects.length - 1) {
    			direction = -1;
    		}

    		if (direction > 0) {
    			$$invalidate(1, iPrev = iCurrent);
    			$$invalidate(0, iCurrent = j);
    			$$invalidate(2, iNext = iCurrent === projects.length - 1 ? 0 : iCurrent + 1);

    			if (direction > 1) {
    				setTimeout(
    					() => {
    						$$invalidate(1, iPrev = iCurrent === 0 ? projects.length - 1 : iCurrent - 1);
    					},
    					1200
    				);
    			}
    		} else {
    			if (Math.abs(direction) > 1) {
    				$$invalidate(1, iPrev = j);

    				setTimeout(
    					() => {
    						$$invalidate(2, iNext = iCurrent);
    						$$invalidate(0, iCurrent = j);
    						$$invalidate(1, iPrev = iCurrent === 0 ? projects.length - 1 : iCurrent - 1);

    						setTimeout(
    							() => {
    								$$invalidate(2, iNext = iCurrent === projects.length - 1 ? 0 : iCurrent + 1);
    							},
    							1200
    						);
    					},
    					800
    				);
    			} else {
    				$$invalidate(2, iNext = iCurrent);
    				$$invalidate(0, iCurrent = j);
    				$$invalidate(1, iPrev = iCurrent === 0 ? projects.length - 1 : iCurrent - 1);
    			}
    		}
    	}

    	let idle = true;
    	let ts = 0;

    	function handleWheel(d) {
    		const dir = d > 0 ? 'next' : 'prev';

    		if (idle) {
    			idle = false;
    			requestSlide(dir);
    		}
    	}

    	function touchMove(y) {
    		let dir = ts - y;
    		handleWheel(dir);
    	}

    	function touchStart(y) {
    		ts = y;
    	}

    	function requestSlide(dir) {
    		if (dir == 'next') {
    			updateProject(iCurrent === projects.length - 1 ? 0 : iCurrent + 1);
    		} else {
    			updateProject(iCurrent === 0 ? projects.length - 1 : iCurrent - 1);
    		}

    		setTimeout(
    			() => {
    				idle = true;
    			},
    			1500
    		);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	const wheel_handler = () => {
    		handleWheel(event.deltaY);
    	};

    	const touchmove_handler = () => {
    		touchMove(event.changedTouches[0].clientY);
    	};

    	const touchstart_handler = () => {
    		touchStart(event.changedTouches[0].clientY);
    	};

    	const click_handler = p => updateProject(projects.indexOf(p));

    	$$self.$capture_state = () => ({
    		Nav,
    		link,
    		projects,
    		fade,
    		fly,
    		onMount,
    		onDestroy,
    		iCurrent,
    		iPrev,
    		iNext,
    		updateProject,
    		idle,
    		ts,
    		handleWheel,
    		touchMove,
    		touchStart,
    		requestSlide
    	});

    	$$self.$inject_state = $$props => {
    		if ('iCurrent' in $$props) $$invalidate(0, iCurrent = $$props.iCurrent);
    		if ('iPrev' in $$props) $$invalidate(1, iPrev = $$props.iPrev);
    		if ('iNext' in $$props) $$invalidate(2, iNext = $$props.iNext);
    		if ('idle' in $$props) idle = $$props.idle;
    		if ('ts' in $$props) ts = $$props.ts;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		iCurrent,
    		iPrev,
    		iNext,
    		updateProject,
    		handleWheel,
    		touchMove,
    		touchStart,
    		wheel_handler,
    		touchmove_handler,
    		touchstart_handler,
    		click_handler
    	];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/pages/Contact.svelte generated by Svelte v3.55.0 */

    const file$7 = "src/pages/Contact.svelte";

    function create_fragment$7(ctx) {
    	let t0;
    	let div0;
    	let nav;
    	let t1;
    	let div2;
    	let h1;
    	let t3;
    	let p0;
    	let t4;
    	let br0;
    	let t5;
    	let p0_intro;
    	let t6;
    	let p1;
    	let t7;
    	let br1;
    	let t8;
    	let p1_intro;
    	let t9;
    	let div1;
    	let a0;
    	let a0_intro;
    	let t11;
    	let a1;
    	let a1_intro;
    	let t13;
    	let div3;
    	let footer;
    	let current;

    	nav = new Nav({
    			props: { active: "contact" },
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div0 = element("div");
    			create_component(nav.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Contact";
    			t3 = space();
    			p0 = element("p");
    			t4 = text("Drop by");
    			br0 = element("br");
    			t5 = text("& say hello 👋");
    			t6 = space();
    			p1 = element("p");
    			t7 = text("Stockholm, Sweden");
    			br1 = element("br");
    			t8 = text("\n        CET – GMT +01:00");
    			t9 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "LinkedIn";
    			t11 = space();
    			a1 = element("a");
    			a1.textContent = "Instagram";
    			t13 = space();
    			div3 = element("div");
    			create_component(footer.$$.fragment);
    			document.title = "Marc Biemer — Contact";
    			attr_dev(div0, "class", "nav-wrapper");
    			add_location(div0, file$7, 14, 0, 343);
    			attr_dev(h1, "class", "screenreader-only");
    			add_location(h1, file$7, 19, 4, 476);
    			add_location(br0, file$7, 22, 15, 640);
    			attr_dev(p0, "class", "txt-h txt-black");
    			add_location(p0, file$7, 20, 4, 523);
    			add_location(br1, file$7, 26, 25, 804);
    			attr_dev(p1, "class", "txt-p txt-grey");
    			add_location(p1, file$7, 24, 4, 679);
    			attr_dev(a0, "class", "txt-p");
    			attr_dev(a0, "href", "https://www.linkedin.com/in/marcbiemer");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "rel", "noreferrer");
    			add_location(a0, file$7, 30, 8, 877);
    			attr_dev(a1, "class", "txt-p");
    			attr_dev(a1, "href", "https://www.instagram.com/marcbiemer");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "rel", "noreferrer");
    			add_location(a1, file$7, 34, 8, 1093);
    			attr_dev(div1, "class", "social svelte-1xwzddm");
    			add_location(div1, file$7, 29, 4, 847);
    			attr_dev(div2, "class", "banner pd-lr pd-tb-lg max-width svelte-1xwzddm");
    			set_style(div2, "height", /*h*/ ctx[0]);
    			add_location(div2, file$7, 18, 0, 405);
    			attr_dev(div3, "class", "footer-wrapper");
    			add_location(div3, file$7, 41, 0, 1319);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			mount_component(nav, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h1);
    			append_dev(div2, t3);
    			append_dev(div2, p0);
    			append_dev(p0, t4);
    			append_dev(p0, br0);
    			append_dev(p0, t5);
    			append_dev(div2, t6);
    			append_dev(div2, p1);
    			append_dev(p1, t7);
    			append_dev(p1, br1);
    			append_dev(p1, t8);
    			append_dev(div2, t9);
    			append_dev(div2, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t11);
    			append_dev(div1, a1);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div3, anchor);
    			mount_component(footer, div3, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);

    			if (!p0_intro) {
    				add_render_callback(() => {
    					p0_intro = create_in_transition(p0, fly, {
    						delay: 150,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					p0_intro.start();
    				});
    			}

    			if (!p1_intro) {
    				add_render_callback(() => {
    					p1_intro = create_in_transition(p1, fly, {
    						delay: 300,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					p1_intro.start();
    				});
    			}

    			if (!a0_intro) {
    				add_render_callback(() => {
    					a0_intro = create_in_transition(a0, fly, {
    						delay: 450,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					a0_intro.start();
    				});
    			}

    			if (!a1_intro) {
    				add_render_callback(() => {
    					a1_intro = create_in_transition(a1, fly, {
    						delay: 500,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					a1_intro.start();
    				});
    			}

    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			destroy_component(nav);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div3);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let h = window.innerHeight;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Nav, Footer, h, fly });

    	$$self.$inject_state = $$props => {
    		if ('h' in $$props) $$invalidate(0, h = $$props.h);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [h];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/post/PostNav.svelte generated by Svelte v3.55.0 */
    const file$6 = "src/components/post/PostNav.svelte";

    function create_fragment$6(ctx) {
    	let nav;
    	let picture;
    	let source;
    	let source_srcset_value;
    	let t0;
    	let img;
    	let img_srcset_value;
    	let img_src_value;
    	let img_alt_value;
    	let t1;
    	let ul;
    	let li0;
    	let a0;
    	let t2;
    	let a0_class_value;
    	let t3;
    	let li1;
    	let p_1;
    	let t4_value = /*p*/ ctx[2].info.title + "";
    	let t4;
    	let p_1_class_value;
    	let t5;
    	let li2;
    	let a1;
    	let t6;
    	let a1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			picture = element("picture");
    			source = element("source");
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			t2 = text("⭠ Prev Project");
    			t3 = space();
    			li1 = element("li");
    			p_1 = element("p");
    			t4 = text(t4_value);
    			t5 = space();
    			li2 = element("li");
    			a1 = element("a");
    			t6 = text("Next Project ⭢");
    			attr_dev(source, "type", "image/webp");
    			attr_dev(source, "srcset", source_srcset_value = "\n                " + /*p*/ ctx[2].preview.url + "360.webp 360w, \n                " + /*p*/ ctx[2].preview.url + "576.webp 576w, \n                " + /*p*/ ctx[2].preview.url + "720.webp 720w,\n                " + /*p*/ ctx[2].preview.url + "1440.webp 1050w,\n                " + /*p*/ ctx[2].preview.url + "2880.webp 2880w\n            ");
    			add_location(source, file$6, 10, 8, 189);
    			attr_dev(img, "role", "presentation");
    			attr_dev(img, "decoding", "async");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "sizes", "\n                (max-width: 749px) 100vw,\n                (max-width: 1519px) 100vw,\n                1440px\n            ");
    			attr_dev(img, "srcset", img_srcset_value = "\n                " + /*p*/ ctx[2].preview.url + "360.jpg 360w,\n                " + /*p*/ ctx[2].preview.url + "576.jpg 576w,\n                " + /*p*/ ctx[2].preview.url + "720.jpg 720w,\n                " + /*p*/ ctx[2].preview.url + "1440.jpg 1440w,\n                " + /*p*/ ctx[2].preview.url + "2880.jpg 2880w\n            ");
    			if (!src_url_equal(img.src, img_src_value = "" + (/*p*/ ctx[2].preview.url + "1440.jpg"))) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*p*/ ctx[2].preview.imgAlt);
    			attr_dev(img, "class", "svelte-ijv7c7");
    			add_location(img, file$6, 20, 8, 510);
    			attr_dev(picture, "class", "bg-image svelte-ijv7c7");
    			add_location(picture, file$6, 9, 4, 154);

    			attr_dev(a0, "class", a0_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-p txt-white"
    			: 'txt-p txt-grey') + " svelte-ijv7c7"));

    			attr_dev(a0, "href", /*prev*/ ctx[1]);
    			add_location(a0, file$6, 42, 12, 1178);
    			add_location(li0, file$6, 41, 8, 1161);

    			attr_dev(p_1, "class", p_1_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-h txt-white"
    			: 'txt-h txt-black') + " svelte-ijv7c7"));

    			add_location(p_1, file$6, 45, 12, 1334);
    			add_location(li1, file$6, 44, 8, 1317);

    			attr_dev(a1, "class", a1_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-p txt-white"
    			: 'txt-p txt-grey') + " svelte-ijv7c7"));

    			attr_dev(a1, "href", /*next*/ ctx[0]);
    			add_location(a1, file$6, 48, 12, 1458);
    			add_location(li2, file$6, 47, 8, 1441);
    			attr_dev(ul, "class", "pd-lr pd-tb-lg max-width svelte-ijv7c7");
    			add_location(ul, file$6, 40, 4, 1115);
    			attr_dev(nav, "class", "pd-tb-sm svelte-ijv7c7");
    			add_location(nav, file$6, 8, 0, 127);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, picture);
    			append_dev(picture, source);
    			append_dev(picture, t0);
    			append_dev(picture, img);
    			append_dev(nav, t1);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, t2);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(li1, p_1);
    			append_dev(p_1, t4);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(li2, a1);
    			append_dev(a1, t6);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(link.call(null, a0)),
    					action_destroyer(link.call(null, a1))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*p*/ 4 && source_srcset_value !== (source_srcset_value = "\n                " + /*p*/ ctx[2].preview.url + "360.webp 360w, \n                " + /*p*/ ctx[2].preview.url + "576.webp 576w, \n                " + /*p*/ ctx[2].preview.url + "720.webp 720w,\n                " + /*p*/ ctx[2].preview.url + "1440.webp 1050w,\n                " + /*p*/ ctx[2].preview.url + "2880.webp 2880w\n            ")) {
    				attr_dev(source, "srcset", source_srcset_value);
    			}

    			if (dirty & /*p*/ 4 && img_srcset_value !== (img_srcset_value = "\n                " + /*p*/ ctx[2].preview.url + "360.jpg 360w,\n                " + /*p*/ ctx[2].preview.url + "576.jpg 576w,\n                " + /*p*/ ctx[2].preview.url + "720.jpg 720w,\n                " + /*p*/ ctx[2].preview.url + "1440.jpg 1440w,\n                " + /*p*/ ctx[2].preview.url + "2880.jpg 2880w\n            ")) {
    				attr_dev(img, "srcset", img_srcset_value);
    			}

    			if (dirty & /*p*/ 4 && !src_url_equal(img.src, img_src_value = "" + (/*p*/ ctx[2].preview.url + "1440.jpg"))) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*p*/ 4 && img_alt_value !== (img_alt_value = /*p*/ ctx[2].preview.imgAlt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*p*/ 4 && a0_class_value !== (a0_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-p txt-white"
    			: 'txt-p txt-grey') + " svelte-ijv7c7"))) {
    				attr_dev(a0, "class", a0_class_value);
    			}

    			if (dirty & /*prev*/ 2) {
    				attr_dev(a0, "href", /*prev*/ ctx[1]);
    			}

    			if (dirty & /*p*/ 4 && t4_value !== (t4_value = /*p*/ ctx[2].info.title + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*p*/ 4 && p_1_class_value !== (p_1_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-h txt-white"
    			: 'txt-h txt-black') + " svelte-ijv7c7"))) {
    				attr_dev(p_1, "class", p_1_class_value);
    			}

    			if (dirty & /*p*/ 4 && a1_class_value !== (a1_class_value = "" + (null_to_empty(/*p*/ ctx[2].preview.dark
    			? "txt-p txt-white"
    			: 'txt-p txt-grey') + " svelte-ijv7c7"))) {
    				attr_dev(a1, "class", a1_class_value);
    			}

    			if (dirty & /*next*/ 1) {
    				attr_dev(a1, "href", /*next*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PostNav', slots, []);
    	let { next } = $$props;
    	let { prev } = $$props;
    	let { p } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (next === undefined && !('next' in $$props || $$self.$$.bound[$$self.$$.props['next']])) {
    			console.warn("<PostNav> was created without expected prop 'next'");
    		}

    		if (prev === undefined && !('prev' in $$props || $$self.$$.bound[$$self.$$.props['prev']])) {
    			console.warn("<PostNav> was created without expected prop 'prev'");
    		}

    		if (p === undefined && !('p' in $$props || $$self.$$.bound[$$self.$$.props['p']])) {
    			console.warn("<PostNav> was created without expected prop 'p'");
    		}
    	});

    	const writable_props = ['next', 'prev', 'p'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PostNav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('next' in $$props) $$invalidate(0, next = $$props.next);
    		if ('prev' in $$props) $$invalidate(1, prev = $$props.prev);
    		if ('p' in $$props) $$invalidate(2, p = $$props.p);
    	};

    	$$self.$capture_state = () => ({ link, next, prev, p });

    	$$self.$inject_state = $$props => {
    		if ('next' in $$props) $$invalidate(0, next = $$props.next);
    		if ('prev' in $$props) $$invalidate(1, prev = $$props.prev);
    		if ('p' in $$props) $$invalidate(2, p = $$props.p);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [next, prev, p];
    }

    class PostNav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { next: 0, prev: 1, p: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PostNav",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get next() {
    		throw new Error("<PostNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set next(value) {
    		throw new Error("<PostNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prev() {
    		throw new Error("<PostNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prev(value) {
    		throw new Error("<PostNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get p() {
    		throw new Error("<PostNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set p(value) {
    		throw new Error("<PostNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/post/TitleBlock.svelte generated by Svelte v3.55.0 */
    const file$5 = "src/components/post/TitleBlock.svelte";

    function create_fragment$5(ctx) {
    	let header;
    	let div0;
    	let h1;
    	let t0;
    	let t1;
    	let p0;
    	let div0_intro;
    	let t3;
    	let div1;
    	let p1;
    	let t5;
    	let p2;
    	let t6;
    	let div1_intro;
    	let t7;
    	let div2;
    	let p3;
    	let t9;
    	let p4;
    	let t10;
    	let div2_intro;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Project";
    			t3 = space();
    			div1 = element("div");
    			p1 = element("p");
    			p1.textContent = "Contributions";
    			t5 = space();
    			p2 = element("p");
    			t6 = text(/*contributions*/ ctx[2]);
    			t7 = space();
    			div2 = element("div");
    			p3 = element("p");
    			p3.textContent = "Year";
    			t9 = space();
    			p4 = element("p");
    			t10 = text(/*year*/ ctx[1]);
    			attr_dev(h1, "class", "txt-h txt-black svelte-mlbf9i");
    			add_location(h1, file$5, 12, 8, 304);
    			attr_dev(p0, "class", "txt-p txt-grey svelte-mlbf9i");
    			add_location(p0, file$5, 13, 8, 353);
    			attr_dev(div0, "class", "title svelte-mlbf9i");
    			add_location(div0, file$5, 11, 4, 211);
    			attr_dev(p1, "class", "txt-p txt-grey svelte-mlbf9i");
    			add_location(p1, file$5, 16, 8, 502);
    			attr_dev(p2, "class", "txt-h txt-black svelte-mlbf9i");
    			add_location(p2, file$5, 17, 8, 554);
    			attr_dev(div1, "class", "subtitle svelte-mlbf9i");
    			add_location(div1, file$5, 15, 4, 406);
    			attr_dev(p3, "class", "txt-p txt-grey svelte-mlbf9i");
    			add_location(p3, file$5, 20, 8, 712);
    			attr_dev(p4, "class", "txt-h txt-black svelte-mlbf9i");
    			add_location(p4, file$5, 21, 8, 755);
    			attr_dev(div2, "class", "subtitle svelte-mlbf9i");
    			add_location(div2, file$5, 19, 4, 616);
    			attr_dev(header, "class", "pd-lr pd-t-lg pd-tb-sm max-width svelte-mlbf9i");
    			add_location(header, file$5, 10, 0, 157);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(header, t3);
    			append_dev(header, div1);
    			append_dev(div1, p1);
    			append_dev(div1, t5);
    			append_dev(div1, p2);
    			append_dev(p2, t6);
    			append_dev(header, t7);
    			append_dev(header, div2);
    			append_dev(div2, p3);
    			append_dev(div2, t9);
    			append_dev(div2, p4);
    			append_dev(p4, t10);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*contributions*/ 4) set_data_dev(t6, /*contributions*/ ctx[2]);
    			if (dirty & /*year*/ 2) set_data_dev(t10, /*year*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (!div0_intro) {
    				add_render_callback(() => {
    					div0_intro = create_in_transition(div0, fly, {
    						delay: 300,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					div0_intro.start();
    				});
    			}

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fly, {
    						delay: 450,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					div1_intro.start();
    				});
    			}

    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fly, {
    						delay: 600,
    						duration: 600,
    						x: 0,
    						y: 200,
    						opacity: 0
    					});

    					div2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TitleBlock', slots, []);
    	let { title } = $$props;
    	let { year } = $$props;
    	let { contributions } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<TitleBlock> was created without expected prop 'title'");
    		}

    		if (year === undefined && !('year' in $$props || $$self.$$.bound[$$self.$$.props['year']])) {
    			console.warn("<TitleBlock> was created without expected prop 'year'");
    		}

    		if (contributions === undefined && !('contributions' in $$props || $$self.$$.bound[$$self.$$.props['contributions']])) {
    			console.warn("<TitleBlock> was created without expected prop 'contributions'");
    		}
    	});

    	const writable_props = ['title', 'year', 'contributions'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TitleBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    		if ('contributions' in $$props) $$invalidate(2, contributions = $$props.contributions);
    	};

    	$$self.$capture_state = () => ({ title, year, contributions, fly });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    		if ('contributions' in $$props) $$invalidate(2, contributions = $$props.contributions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, year, contributions];
    }

    class TitleBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0, year: 1, contributions: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBlock",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get title() {
    		throw new Error("<TitleBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TitleBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get year() {
    		throw new Error("<TitleBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set year(value) {
    		throw new Error("<TitleBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contributions() {
    		throw new Error("<TitleBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contributions(value) {
    		throw new Error("<TitleBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/post/ImgBlock.svelte generated by Svelte v3.55.0 */

    const file$4 = "src/components/post/ImgBlock.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:4) {#each img as i}
    function create_each_block$1(ctx) {
    	let figure;
    	let picture;
    	let source;
    	let source_srcset_value;
    	let t0;
    	let img_1;
    	let img_1_srcset_value;
    	let img_1_src_value;
    	let img_1_alt_value;
    	let t1;
    	let figcaption;
    	let t2_value = /*i*/ ctx[4].alt + "";
    	let t2;
    	let t3;
    	let figure_class_value;

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			picture = element("picture");
    			source = element("source");
    			t0 = space();
    			img_1 = element("img");
    			t1 = space();
    			figcaption = element("figcaption");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(source, "type", "image/webp");
    			attr_dev(source, "srcset", source_srcset_value = "\n                        " + /*i*/ ctx[4].src + "360.webp 360w, \n                        " + /*i*/ ctx[4].src + "576.webp 576w, \n                        " + /*i*/ ctx[4].src + "720.webp 720w,\n                        " + /*i*/ ctx[4].src + "1440.webp 1440w,\n                        " + /*i*/ ctx[4].src + "2880.webp 2880w,\n                    ");
    			add_location(source, file$4, 13, 16, 335);
    			attr_dev(img_1, "role", "presentation");
    			attr_dev(img_1, "decoding", "async");
    			attr_dev(img_1, "loading", "lazy");
    			attr_dev(img_1, "sizes", "\n                        (max-width: 749px) calc(100vw * " + /*ratio*/ ctx[3] + "), \n                        (max-width: 1520px) calc((100vw * " + /*ratio*/ ctx[3] + ") - 80px), \n                        1440px\n                    ");
    			attr_dev(img_1, "srcset", img_1_srcset_value = "\n                        " + /*i*/ ctx[4].src + "360.jpg 360w, \n                        " + /*i*/ ctx[4].src + "576.jpg 576w, \n                        " + /*i*/ ctx[4].src + "720.jpg 720w,\n                        " + /*i*/ ctx[4].src + "1440.jpg 1440w,\n                        " + /*i*/ ctx[4].src + "2880.jpg 2880w,\n                    ");
    			if (!src_url_equal(img_1.src, img_1_src_value = "" + (/*i*/ ctx[4].src + "360.jpg"))) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", img_1_alt_value = /*i*/ ctx[4].alt);
    			attr_dev(img_1, "class", "svelte-1yl9mne");
    			add_location(img_1, file$4, 23, 16, 697);
    			add_location(picture, file$4, 12, 12, 309);
    			attr_dev(figcaption, "class", "screenreader-only");
    			add_location(figcaption, file$4, 43, 12, 1448);

    			attr_dev(figure, "class", figure_class_value = "" + (null_to_empty(/*type*/ ctx[0] == 'c'
    			? 'img-center ' + /*pd*/ ctx[2]
    			: '' + /*pd*/ ctx[2]) + " svelte-1yl9mne"));

    			add_location(figure, file$4, 11, 8, 237);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, picture);
    			append_dev(picture, source);
    			append_dev(picture, t0);
    			append_dev(picture, img_1);
    			append_dev(figure, t1);
    			append_dev(figure, figcaption);
    			append_dev(figcaption, t2);
    			append_dev(figure, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*img*/ 2 && source_srcset_value !== (source_srcset_value = "\n                        " + /*i*/ ctx[4].src + "360.webp 360w, \n                        " + /*i*/ ctx[4].src + "576.webp 576w, \n                        " + /*i*/ ctx[4].src + "720.webp 720w,\n                        " + /*i*/ ctx[4].src + "1440.webp 1440w,\n                        " + /*i*/ ctx[4].src + "2880.webp 2880w,\n                    ")) {
    				attr_dev(source, "srcset", source_srcset_value);
    			}

    			if (dirty & /*img*/ 2 && img_1_srcset_value !== (img_1_srcset_value = "\n                        " + /*i*/ ctx[4].src + "360.jpg 360w, \n                        " + /*i*/ ctx[4].src + "576.jpg 576w, \n                        " + /*i*/ ctx[4].src + "720.jpg 720w,\n                        " + /*i*/ ctx[4].src + "1440.jpg 1440w,\n                        " + /*i*/ ctx[4].src + "2880.jpg 2880w,\n                    ")) {
    				attr_dev(img_1, "srcset", img_1_srcset_value);
    			}

    			if (dirty & /*img*/ 2 && !src_url_equal(img_1.src, img_1_src_value = "" + (/*i*/ ctx[4].src + "360.jpg"))) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}

    			if (dirty & /*img*/ 2 && img_1_alt_value !== (img_1_alt_value = /*i*/ ctx[4].alt)) {
    				attr_dev(img_1, "alt", img_1_alt_value);
    			}

    			if (dirty & /*img*/ 2 && t2_value !== (t2_value = /*i*/ ctx[4].alt + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*type, pd*/ 5 && figure_class_value !== (figure_class_value = "" + (null_to_empty(/*type*/ ctx[0] == 'c'
    			? 'img-center ' + /*pd*/ ctx[2]
    			: '' + /*pd*/ ctx[2]) + " svelte-1yl9mne"))) {
    				attr_dev(figure, "class", figure_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(11:4) {#each img as i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let div_class_value;
    	let each_value = /*img*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*type*/ ctx[0] == 's'
    			? 'figure-wrapper pd-lr max-width'
    			: 'figure-wrapper bg') + " svelte-1yl9mne"));

    			add_location(div, file$4, 9, 0, 125);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type, pd, img, ratio*/ 15) {
    				each_value = /*img*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*type*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*type*/ ctx[0] == 's'
    			? 'figure-wrapper pd-lr max-width'
    			: 'figure-wrapper bg') + " svelte-1yl9mne"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ImgBlock', slots, []);
    	let { type } = $$props;
    	let { img } = $$props;
    	let { pd = '' } = $$props;
    	let ratio = type === 's' ? .5 : 1;

    	$$self.$$.on_mount.push(function () {
    		if (type === undefined && !('type' in $$props || $$self.$$.bound[$$self.$$.props['type']])) {
    			console.warn("<ImgBlock> was created without expected prop 'type'");
    		}

    		if (img === undefined && !('img' in $$props || $$self.$$.bound[$$self.$$.props['img']])) {
    			console.warn("<ImgBlock> was created without expected prop 'img'");
    		}
    	});

    	const writable_props = ['type', 'img', 'pd'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ImgBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('img' in $$props) $$invalidate(1, img = $$props.img);
    		if ('pd' in $$props) $$invalidate(2, pd = $$props.pd);
    	};

    	$$self.$capture_state = () => ({ type, img, pd, ratio });

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('img' in $$props) $$invalidate(1, img = $$props.img);
    		if ('pd' in $$props) $$invalidate(2, pd = $$props.pd);
    		if ('ratio' in $$props) $$invalidate(3, ratio = $$props.ratio);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, img, pd, ratio];
    }

    class ImgBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { type: 0, img: 1, pd: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImgBlock",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get type() {
    		throw new Error("<ImgBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<ImgBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get img() {
    		throw new Error("<ImgBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<ImgBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pd() {
    		throw new Error("<ImgBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pd(value) {
    		throw new Error("<ImgBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/post/TextBlock.svelte generated by Svelte v3.55.0 */

    const file$3 = "src/components/post/TextBlock.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let p;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p = element("p");
    			attr_dev(h2, "class", "txt-p txt-black svelte-zkcein");
    			add_location(h2, file$3, 8, 8, 200);
    			attr_dev(p, "class", "txt-p txt-grey body-copy svelte-zkcein");
    			add_location(p, file$3, 9, 8, 249);
    			attr_dev(section, "class", "pd-lr pd-tb-lg max-width svelte-zkcein");
    			add_location(section, file$3, 7, 4, 149);
    			attr_dev(div, "class", div_class_value = /*extraPadding*/ ctx[2] ? 'pd-tb-lg' : '');
    			add_location(div, file$3, 6, 0, 100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, section);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(section, t1);
    			append_dev(section, p);
    			p.innerHTML = /*body*/ ctx[1];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*body*/ 2) p.innerHTML = /*body*/ ctx[1];
    			if (dirty & /*extraPadding*/ 4 && div_class_value !== (div_class_value = /*extraPadding*/ ctx[2] ? 'pd-tb-lg' : '')) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextBlock', slots, []);
    	let { title } = $$props;
    	let { body } = $$props;
    	let { extraPadding = false } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<TextBlock> was created without expected prop 'title'");
    		}

    		if (body === undefined && !('body' in $$props || $$self.$$.bound[$$self.$$.props['body']])) {
    			console.warn("<TextBlock> was created without expected prop 'body'");
    		}
    	});

    	const writable_props = ['title', 'body', 'extraPadding'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('body' in $$props) $$invalidate(1, body = $$props.body);
    		if ('extraPadding' in $$props) $$invalidate(2, extraPadding = $$props.extraPadding);
    	};

    	$$self.$capture_state = () => ({ title, body, extraPadding });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('body' in $$props) $$invalidate(1, body = $$props.body);
    		if ('extraPadding' in $$props) $$invalidate(2, extraPadding = $$props.extraPadding);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, body, extraPadding];
    }

    class TextBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { title: 0, body: 1, extraPadding: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextBlock",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get title() {
    		throw new Error("<TextBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TextBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get body() {
    		throw new Error("<TextBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set body(value) {
    		throw new Error("<TextBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get extraPadding() {
    		throw new Error("<TextBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set extraPadding(value) {
    		throw new Error("<TextBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/Error.svelte generated by Svelte v3.55.0 */

    const { Error: Error_1$1 } = globals;
    const file$2 = "src/pages/Error.svelte";

    function create_fragment$2(ctx) {
    	let t0;
    	let div0;
    	let nav;
    	let t1;
    	let div1;
    	let h1;
    	let t3;
    	let p0;
    	let t5;
    	let p1;
    	let t6;
    	let br;
    	let t7;
    	let t8;
    	let div2;
    	let footer;
    	let current;
    	nav = new Nav({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div0 = element("div");
    			create_component(nav.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Error";
    			t3 = space();
    			p0 = element("p");
    			p0.textContent = "Oh sh*t 😅";
    			t5 = space();
    			p1 = element("p");
    			t6 = text("Looks like this page doesn't exist. ");
    			br = element("br");
    			t7 = text("Let's go back and try again?");
    			t8 = space();
    			div2 = element("div");
    			create_component(footer.$$.fragment);
    			document.title = "Marc Biemer — Not found";
    			attr_dev(div0, "class", "nav-wrapper");
    			add_location(div0, file$2, 9, 0, 223);
    			attr_dev(h1, "class", "screenreader-only");
    			add_location(h1, file$2, 13, 4, 322);
    			attr_dev(p0, "class", "txt-h txt-black");
    			add_location(p0, file$2, 14, 4, 367);
    			add_location(br, file$2, 15, 66, 482);
    			attr_dev(p1, "class", "txt-p txt-grey");
    			add_location(p1, file$2, 15, 4, 420);
    			attr_dev(div1, "class", "banner pd-lr pd-tb-lg max-width svelte-183jyjp");
    			add_location(div1, file$2, 12, 0, 272);
    			attr_dev(div2, "class", "footer-wrapper");
    			add_location(div2, file$2, 17, 0, 526);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			mount_component(nav, div0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t3);
    			append_dev(div1, p0);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			append_dev(p1, t6);
    			append_dev(p1, br);
    			append_dev(p1, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(footer, div2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			destroy_component(nav);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(div2);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Error', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Error> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Nav, Footer });
    	return [];
    }

    class Error$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/pages/projects/Project.svelte generated by Svelte v3.55.0 */

    const { Error: Error_1 } = globals;

    const file$1 = "src/pages/projects/Project.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (69:0) {:else}
    function create_else_block(ctx) {
    	let error;
    	let current;
    	error = new Error$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(error.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(error, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(error.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(error.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(error, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(69:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:0) {#if project}
    function create_if_block(ctx) {
    	let nav;
    	let t0;
    	let article;
    	let titleblock;
    	let t1;
    	let t2;
    	let postnav;
    	let t3;
    	let footer;
    	let current;
    	nav = new Nav({ props: { isMain: false }, $$inline: true });

    	titleblock = new TitleBlock({
    			props: {
    				title: /*project*/ ctx[0].info.title,
    				year: /*project*/ ctx[0].info.year,
    				contributions: /*project*/ ctx[0].info.con.toString().replaceAll(',', ', ')
    			},
    			$$inline: true
    		});

    	let if_block = /*project*/ ctx[0].content && create_if_block_1(ctx);

    	postnav = new PostNav({
    			props: {
    				prev: `/projects/${projects[/*prevProject*/ ctx[2]].info.path}`,
    				next: `/projects/${projects[/*nextProject*/ ctx[1]].info.path}`,
    				p: /*project*/ ctx[0]
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(nav.$$.fragment);
    			t0 = space();
    			article = element("article");
    			create_component(titleblock.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(postnav.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    			add_location(article, file$1, 46, 4, 1434);
    		},
    		m: function mount(target, anchor) {
    			mount_component(nav, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, article, anchor);
    			mount_component(titleblock, article, null);
    			append_dev(article, t1);
    			if (if_block) if_block.m(article, null);
    			append_dev(article, t2);
    			mount_component(postnav, article, null);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const titleblock_changes = {};
    			if (dirty & /*project*/ 1) titleblock_changes.title = /*project*/ ctx[0].info.title;
    			if (dirty & /*project*/ 1) titleblock_changes.year = /*project*/ ctx[0].info.year;
    			if (dirty & /*project*/ 1) titleblock_changes.contributions = /*project*/ ctx[0].info.con.toString().replaceAll(',', ', ');
    			titleblock.$set(titleblock_changes);

    			if (/*project*/ ctx[0].content) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*project*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(article, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const postnav_changes = {};
    			if (dirty & /*prevProject*/ 4) postnav_changes.prev = `/projects/${projects[/*prevProject*/ ctx[2]].info.path}`;
    			if (dirty & /*nextProject*/ 2) postnav_changes.next = `/projects/${projects[/*nextProject*/ ctx[1]].info.path}`;
    			if (dirty & /*project*/ 1) postnav_changes.p = /*project*/ ctx[0];
    			postnav.$set(postnav_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(titleblock.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(postnav.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(titleblock.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(postnav.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(article);
    			destroy_component(titleblock);
    			if (if_block) if_block.d();
    			destroy_component(postnav);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(45:0) {#if project}",
    		ctx
    	});

    	return block;
    }

    // (53:8) {#if project.content}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*project*/ ctx[0].content;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1) {
    				each_value = /*project*/ ctx[0].content;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(53:8) {#if project.content}",
    		ctx
    	});

    	return block;
    }

    // (57:43) 
    function create_if_block_3(ctx) {
    	let imgblock;
    	let current;

    	imgblock = new ImgBlock({
    			props: {
    				type: /*b*/ ctx[5].type,
    				pd: /*b*/ ctx[5].pd,
    				img: /*b*/ ctx[5].img
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imgblock.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imgblock, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const imgblock_changes = {};
    			if (dirty & /*project*/ 1) imgblock_changes.type = /*b*/ ctx[5].type;
    			if (dirty & /*project*/ 1) imgblock_changes.pd = /*b*/ ctx[5].pd;
    			if (dirty & /*project*/ 1) imgblock_changes.img = /*b*/ ctx[5].img;
    			imgblock.$set(imgblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imgblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imgblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(imgblock, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(57:43) ",
    		ctx
    	});

    	return block;
    }

    // (55:16) {#if b.block == 'txt'}
    function create_if_block_2(ctx) {
    	let textblock;
    	let current;

    	textblock = new TextBlock({
    			props: {
    				title: /*b*/ ctx[5].title,
    				body: /*b*/ ctx[5].body
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(textblock.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textblock, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textblock_changes = {};
    			if (dirty & /*project*/ 1) textblock_changes.title = /*b*/ ctx[5].title;
    			if (dirty & /*project*/ 1) textblock_changes.body = /*b*/ ctx[5].body;
    			textblock.$set(textblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textblock, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(55:16) {#if b.block == 'txt'}",
    		ctx
    	});

    	return block;
    }

    // (54:12) {#each project.content as b}
    function create_each_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_if_block_3];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*b*/ ctx[5].block == 'txt') return 0;
    		if (/*b*/ ctx[5].block == 'img') return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(54:12) {#each project.content as b}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let title_value;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	document.title = title_value = "Marc Biemer — " + (/*project*/ ctx[0]
    	? /*project*/ ctx[0].info.title
    	: 'Project not found');

    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*project*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*project*/ 1) && title_value !== (title_value = "Marc Biemer — " + (/*project*/ ctx[0]
    			? /*project*/ ctx[0].info.title
    			: 'Project not found'))) {
    				document.title = title_value;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Project', slots, []);
    	let { params = {} } = $$props;
    	let project;
    	let nextProject;
    	let prevProject;

    	function refreshData() {
    		projects.forEach(p => {
    			if (params.title === p.info.path) {
    				$$invalidate(0, project = p);

    				$$invalidate(1, nextProject = projects.indexOf(p) === projects.length - 1
    				? 0
    				: projects.indexOf(p) + 1);

    				$$invalidate(2, prevProject = projects.indexOf(p) === 0
    				? projects.length - 1
    				: projects.indexOf(p) - 1);
    			}
    		});
    	}

    	beforeUpdate(() => {
    		window.scrollTo(0, 0);
    		refreshData();
    	});

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(3, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		Nav,
    		PostNav,
    		Footer,
    		TitleBlock,
    		ImgBlock,
    		TextBlock,
    		Error: Error$1,
    		projects,
    		params,
    		project,
    		nextProject,
    		prevProject,
    		refreshData,
    		beforeUpdate
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(3, params = $$props.params);
    		if ('project' in $$props) $$invalidate(0, project = $$props.project);
    		if ('nextProject' in $$props) $$invalidate(1, nextProject = $$props.nextProject);
    		if ('prevProject' in $$props) $$invalidate(2, prevProject = $$props.prevProject);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [project, nextProject, prevProject, params];
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { params: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Project",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get params() {
    		throw new Error_1("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error_1("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // Main Pages

    const routes = {
      "/": Home,
      "/info": Info,
      "/projects/:title" : Project,
      "/projects": Projects,
      "/contact": Contact,
      "*": Error$1,
    };

    /* src/App.svelte generated by Svelte v3.55.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let router;
    	let current;
    	router = new Router({ props: { routes }, $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(router.$$.fragment);
    			add_location(main, file, 4, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, routes });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
