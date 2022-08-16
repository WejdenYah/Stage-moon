import React, { useState } from 'react'
import { Bell, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from "react-hook-form";
import firebase from '../firebase'
import moment from 'moment'
import randomcolor from 'randomcolor'
function TodoForm({
   
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects,
    showButtons = false,
    showModal,setShowModal
}){
    const { register,handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        firebase
        .firestore()
        .collection('todos')
        .add(
            {
                text : data.name_todo,
                date : moment(day).format('MM/DD/YYYY'),
                day : moment(day).format('d'),
                time : moment(time).format('hh:mm A'),
                checked : false,
                color : randomcolor(),
                projectName : todoProject
            }
        )
        setShowModal (false)

    };


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <form onSubmit={handleSubmit(onSubmit)} className='TodoForm'>
                <div className="text">
                    {
                        heading && 
                        <h3>{heading}</h3>
                    }
          
                    
                <input                         placeholder='To do ...'
                {...register("name_todo", { required: true })} />
                {errors.name_todo && <span>This field is required</span>}

                </div>

                <div className="remind">
                    <Bell />
                    <p>Remind Me!</p>
                </div>
                <div className="pick-day">
                    <div className="title">
                        <CalendarDay />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker
                        value={day}
                        onChange={day => setDay(day)}
                    />
                </div>
                <div className="pick-time">
                    <div className="title">
                        <Clock />
                        <p>Choose time</p>
                    </div>
                    <TimePicker
                        value={time}
                        onChange={time => setTime(time)}
                    />
                </div>
                <div className="pick-project">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.length > 0 ?
                            projects.map( project => 
                                <div
                                    className={`project ${todoProject === project.name ? "active" : ""}`}
                                    onClick={() => setTodoProject(project.name)}
                                    key={project.id}
                                >
                                    {project.name}
                                </div>    
                            )
                            :
                            <div style={{color:'#ff0000'}}>
                                Please add a project before proceeding
                            </div>
                        }
                    </div>
                </div>
                {
                    showButtons &&
                    <div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </div>
                }
            </form>
        </MuiPickersUtilsProvider>
    )
}

export default TodoForm