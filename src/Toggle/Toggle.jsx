import styles from "./Toggle.module.scss";
import {useEffect, useState} from "react";
import {ReactComponent as RuntimeIcon} from "../assets/image/eye.svg"
import {ReactComponent as ConstructorIcon} from "../assets/image/selector.svg"
import classNames from "classnames";
import {connect} from "react-redux";
import {enableConstructorMode} from "../redux/constructorState";

const Toggle = ({isEditMode, enableConstructorMode}) => {
    const [isConstructorMode, setConstructorMode] = useState(isEditMode);

    useEffect(() => {
        enableConstructorMode(isConstructorMode)
    }, [isConstructorMode, enableConstructorMode])

    return (
        <div className={styles.toggle}>
            <button type={"button"} onClick={() => {
                setConstructorMode(false)
            }}
                    className={!isConstructorMode
                        ? classNames(styles.toggle__runtime, styles.active)
                        : styles.toggle__runtime
                    }>
                <RuntimeIcon
                    className={!isConstructorMode
                        ? classNames(styles.toggle__runtime__img, styles.activeIcon)
                        : styles.toggle__runtime__img
                    }/>
                <p>Runtime</p>
            </button>
            <button type={"button"} onClick={() => setConstructorMode(true)}
                    className={isConstructorMode
                        ? classNames(styles.toggle__constructor, styles.active)
                        : styles.toggle__constructor}>
                <ConstructorIcon
                    className={isConstructorMode
                        ? classNames(styles.toggle__constructor__img, styles.activeIcon)
                        : styles.toggle__constructor__img}/>
                <p>Constructor</p>
            </button>
        </div>
    )
}

export default connect(
    (state) => ({isEditMode: state.constructorState.isEditMode}),
    {enableConstructorMode})(Toggle);