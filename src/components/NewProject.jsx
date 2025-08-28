import {useRef} from 'react'
import Button from './Button.jsx';
import Input from './Input.jsx';
import Modal from './Modal.jsx';

export default function NewProject({onAdd, onCancel}) {

  const modal = useRef()

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave(){
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
modal.current.open();
return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    })
  }

  return (
    <>
    <Modal ref={modal} buttonCaption="OK">
      <h2>Invalid Input</h2>
      <p>Oops... Look like you forgot to enter a value</p>
      <p>Please make sure you provide a valid value for every input fields</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <Button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</Button>
        </li>
        <li>
          <Button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</Button>
        </li>
      </menu>
      <div>
        <Input type="text" ref={title} label="Title" />
        <Input ref={description} label="Description" textarea />
        <Input type="date" ref={dueDate} label="Due Date" />
      </div>
    </div>
     </>
  );
}
