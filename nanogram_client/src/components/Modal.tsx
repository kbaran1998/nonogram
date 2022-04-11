import './modal.css';

interface ModalProps {
    show: boolean;
    childrenText: string;
}

const Modal = (props: ModalProps) => {
    const showHideClassName = props.show
        ? 'modal display-block'
        : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2>{props.childrenText}</h2>
            </section>
        </div>
    );
};

export default Modal;
