import './variants.css'
import classnames from 'classnames'

function AppBadge({
    primary = false,
    secondary = false,
    success = false,
    mild = false,
    danger = false,
    white = false,
    pill = false,
    fontSize,
    full = false,
    children,
    ...rest
}) {
    const count = Number(!!primary) + Number(!!secondary) + Number(!!success) + Number(!!mild) + Number(!!danger) + Number(!!white)
    if (count > 1) {
        throw new Error('Only one color variant required!!')
    }

    const classes = classnames(rest.className, 'y-p x-p', {
        'color-dark': !secondary,
        'color-light': secondary,
        'b-primary': primary,
        'b-secondary': secondary,
        'b-success': success,
        'b-mild': mild,
        'b-danger': danger,
        'b-white': white,
        'is-pill': !pill,
        'is-full': full
    })
    return <span {...rest} className={classes} style={{ fontSize: fontSize || '0.85rem', ...rest.style }}>{children}</span>
}

export default AppBadge