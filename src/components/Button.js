import './variants.css'
import classnames from 'classnames'

function AppButton({
    primary = false,
    secondary = false,
    success = false,
    mild = false,
    danger = false,
    white = false,
    pill = false,
    selected = false,
    fontSize,
    full = false,
    children,
    ...rest
}) {
    const count = Number(!!primary) + Number(!!secondary) + Number(!!success) + Number(!!mild) + Number(!!danger) + Number(!!white)
    if (count > 1) {
        throw new Error('Only one color variant required!!')
    }

    const classes = classnames(rest.className, 'btn-lighten y-p x-p', {
        'color-dark': !secondary,
        'color-light': secondary,
        'b-primary': primary,
        'b-secondary': secondary,
        'b-success': success,
        'b-mild': mild,
        'b-danger': danger,
        'b-white': white,
        'is-pill': pill,
        'is-full': full,
        'is-selected': selected
    })
    return <button {...rest} className={classes} style={{ fontSize: fontSize || '1rem', ...rest.style }}>{children}</button>
}

export default AppButton