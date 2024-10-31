import { Suspense, createContext, lazy, useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import lazyRetry from "../../../lib/lazyRetry";

import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { Icon, Loading } from "../../../components";
import { queryClient } from "../../../router";
const Content = lazy(() => lazyRetry(() => import("./Content")));
const Setting = lazy(() => lazyRetry(() => import("./Setting")));
const Design = lazy(() => lazyRetry(() => import("./Design")));
const Preview = lazy(() => lazyRetry(() => import("./Preview")));

import { __ } from '@wordpress/i18n';
import { toast } from "sonner";

const tabs = [
    { label: __('Content', 'pop-and-convert'), content: Content, icon: <Icon icon="content" /> },
    { label: __('Settings', 'pop-and-convert'), content: Setting, icon: <Icon icon="setting" /> },
    { label: __('Customization', 'pop-and-convert'), content: Design, icon: <Icon icon="puzzel" /> },
    { label: __('Preview', 'pop-and-convert'), content: Preview, icon: <Icon icon="preview" /> },
]

export const FormContext = createContext({})


export default function NotificationForm({ notification }) {

    const [state, setState] = useState(notification)

    const [activeTab, setActiveTab] = useState(0)

    const { id, createdAt } = notification || {}

    const dataReadyForMutation = {
        'title': state.title,
        'leadTitle': state.leadTitle,
        'type': state.type,
        'layout': state.layout,
        'sticky_layout': state.sticky_layout,
        'popup_layout': state.popup_layout,
        'image_data': state.image_data,
        'description': state.description,
        'status': state.status,
        'buttonLink': state.buttonLink,
        'buttonTitle': state.buttonTitle,
        'newTab': state.newTab,
        'relAttribute': state.relAttribute,
        'trigger': state.trigger,
        'delay': state.delay,
        'desktop_visibility': state.desktop_visibility,
        'mobile_visibility': state.mobile_visibility,
        'tablet_visibility': state.tablet_visibility,
        'priority': state.priority,
        'createdAt': state.createdAt,
        'updatedAt': state.updatedAt,
        'location_visibility': state.location_visibility,
        'locations': state.locations,
        'enable_custom_styling': state.enable_custom_styling,
        'desk_title_size': state.desk_title_size,
        'desk_desc_size': state.desk_desc_size,
        'mob_title_size': state.mob_title_size,
        'mob_desc_size': state.mob_desc_size,
        'tab_title_size': state.tab_title_size,
        'tab_desc_size': state.tab_desc_size,
        'btn_bg_color': state.btn_bg_color,
        'btn_text_color': state.btn_text_color,
        'btn_border_rad': state.btn_border_rad,
        'img_border_rad': state.img_border_rad,
        'img_width': state.img_width,
        'img_height': state.img_height,
        'imageSizeType': state.imageSizeType,
        'box_border_rad': state.box_border_rad,
        'selected_posts': state.selected_posts,
        'post_page_id': state.post_page_id,
        'box_width': state.box_width
    }

    const navigate = useNavigate()

    const Content = tabs[activeTab].content

    function handleTabClick(index) {
        setActiveTab(index)
    }

    const handleChange = (key) => (event) => {

        if (typeof event === "object" && !Array.isArray(event)) {
            const { value, type, checked } = event.target
            setState({
                ...state,
                [key]: type === "checkbox" ? checked : value
            })
        } else if (typeof event === "string" || Number.isInteger(event) || Array.isArray(event)) {
            setState({
                ...state,
                [key]: event
            })
        }
    }

    const handlePublish = useMutation({
        mutationFn: async (DATA) => {
            const url = id ? `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`
                : `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications`
            const statsURL = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-stats`
            DATA.id = id === undefined ? Math.random().toString(36).substring(2, 9) : id
            DATA.createdAt = createdAt === null ? Date.now() : createdAt
            DATA.updatedAt = Date.now()
            DATA.status = 'active'

            try {
                const res = await axios.post(url, DATA, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-NONCE': pacpAdminData.nonce
                    }
                });

                handleChange('status')('active')
                queryClient.invalidateQueries(["notifications", id])

                const statsRes = await axios.post(statsURL,
                    {
                        id: DATA.id,
                        views: 0,
                        clicks: 0
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                queryClient.invalidateQueries(["stats"])
                return res
            } catch (error) {
                throw error
            }
        }
    });

    const handleUpdate = useMutation({
        mutationFn: DATA => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`
            DATA.updatedAt = Date.now()

            return axios.post(url, DATA, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-NONCE': pacpAdminData.nonce
                }
            }).then(res => {
                queryClient.invalidateQueries(["notifications", id])
                return res;
            }).catch(error => {
                throw error;
            })
        }
    })

    const handleDraft = useMutation({
        mutationFn: async (DATA) => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`
            const statsURL = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-stats`

            DATA.status = 'inactive'
            DATA.id = id === undefined ? Math.random().toString(36).substring(2, 9) : id
            DATA.createdAt = createdAt === null ? Date.now() : createdAt
            DATA.updatedAt = Date.now()

            try {
                const res = await axios.post(url, DATA, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-NONCE': pacpAdminData.nonce
                    }
                });
                handleChange('status')('inactive')
                queryClient.invalidateQueries(["notifications", id])

                if (id === undefined) {
                    const statsRes = await axios.post(statsURL,
                        {
                            id: DATA.id,
                            views: 0,
                            clicks: 0
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                }

                queryClient.invalidateQueries(["stats"])
                return res;
            } catch (error) {
                throw error
            }
        }
    })

    const handleUpdateMessage = () => {
        if (state.title !== null && state.title !== '') {
            toast.promise(
                handleUpdate.mutateAsync(dataReadyForMutation),
                {
                    loading: __('Changing status...', 'pop-and-convert'),
                    success: __('Notification has been updated successfully.', 'pop-and-convert'),
                    error: __('Failed to change status', 'pop-and-convert')
                }
            )
        }
    }

    const handlePublishMessage = () => {
        if (state.title !== null && state.title !== '' && state.leadTitle !== null && state.leadTitle !== '') {
            toast.promise(
                handlePublish.mutateAsync(dataReadyForMutation),
                {
                    loading: __('Publishing notification', 'pop-and-convert'),
                    success: __('Notification has been published successfully.', 'pop-and-convert'),
                    error: __('Failed to publish notification', 'pop-and-convert')
                }
            )
        }
    }

    const handleDraftMessage = () => {
        toast.promise(
            handleDraft.mutateAsync(dataReadyForMutation),
            {
                loading: __('Unpublishing notification', 'pop-and-convert'),
                success: __('Notification has been saved as Draft.', 'pop-and-convert'),
                error: __('Failed to draft notification', 'pop-and-convert')
            }
        )
    }

    return (
        <FormContext.Provider value={{ state, setState: handleChange }}>
            <Form method="post">
                <div className="flex flex-col gap-6 max-w-7xl mx-auto p-6">
                    <div className="flex justify-between items-center">
                        <button type="button" className="flex items-center hover:text-primary-color" to="/notifications" onClick={() => navigate("/notifications")}>
                            <Icon icon="double-arrow-left" /> {__('Back', 'pop-and-convert')}
                        </button>
                        <div className="flex gap-4">
                            {
                                <>
                                    <button
                                        className={`btn-secondary`}
                                        type="submit"
                                        onClick={handleDraftMessage}
                                    >
                                        {`${state.status === 'inactive' ? __('Save as', 'pop-and-convert') : __('Switch to', 'pop-and-convert')} ${__('Draft', 'pop-and-convert')}`}
                                    </button>
                                    <button
                                        className="btn-primary"
                                        type="submit"
                                        onClick={state.status === 'inactive' ? handlePublishMessage : handleUpdateMessage}
                                    >
                                        {`${state.status === 'inactive' ? __('Publish', 'pop-and-convert') : __('Update', 'pop-and-convert')}`}
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    <div>
                        <input
                            name="title"
                            type="text"
                            className="pac-input"
                            placeholder={__('Notification Title', 'pop-and-convert')}
                            value={state?.title || ''}
                            onChange={handleChange('title')}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-6 lg:flex-row">
                        <aside className="bg-white box-shadow rounded py-6 lg:w-1/4">
                            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:sticky lg:top-12">
                                {tabs.map(({ label, icon }, index) => {
                                    return <button onClick={() => handleTabClick(index)} className={`text-base py-2 px-4 text-left inline-flex items-center gap-3 hover:text-primary-color ${activeTab === index && 'border-l-4 border-primary-color text-primary-color font-semibold'}`} key={index} type="button">
                                        {icon}
                                        {label}
                                    </button>
                                }
                                )}
                            </nav>
                        </aside>
                        <div className="flex-1">
                            <Suspense fallback={<Loading />}>
                                <Content notification={notification || {}} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </Form>
        </FormContext.Provider>
    );
}
