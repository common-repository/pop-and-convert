import { useMutation, useQuery } from "@tanstack/react-query";
import { __ } from '@wordpress/i18n';
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Icon, Skeleton, TablePagination, Toggle, Tooltip, Dialog, ConfirmDialog } from "../../../components";
import { queryClient } from "../../../router";
import { getNotificationStats } from "../../../store";

export default function (props) {

    const { data: notificationStats } = useQuery(["stats"], getNotificationStats)

    const { items } = props;

    const [selectedNotifications, setSelectedNotifications] = useState([]);

    const [bulkAction, setBulkAction] = useState('bulk-action')

    const [dialogOpen, setDialogOpen] = useState(false);

    const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    function handleBulkChange(event) {
        setBulkAction(event.target.value)
    }

    const [paginationSettings, setPaginationSettings] = useState({
        itemsPerPage: 10,
        currentPage: 1,
    });

    const handleCopyAction = useMutation({
        mutationFn: async (id) => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications`
            const statsURL = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-stats`

            let copyData = { ...items.find(({ id: _id }) => id === _id) };
            copyData.title = "Copy - " + copyData.title;
            copyData.id = Math.random().toString(36).substring(2, 9);
            copyData.updatedAt = Date.now();

            try {
                const res = await axios.post(url, copyData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-NONCE': pacpAdminData.nonce
                    }
                });

                queryClient.invalidateQueries(["notifications", "all"])
                queryClient.invalidateQueries(["notifications", props.searchQuery])

                const statsRes = await axios.post(statsURL, {
                    id: copyData.id,
                    views: 0,
                    clicks: 0
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                queryClient.invalidateQueries(["stats"])
                return res;
            } catch (error) {
                throw error;
            }
        }
    });

    const handleStatusChangeAction = useMutation({
        mutationFn: id => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`;
            let changeStatusData = { ...items.find(({ id: _id }) => id === _id) };
            changeStatusData.status = changeStatusData.status === 'active' ? 'inactive' : 'active';

            return axios.post(url, changeStatusData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-NONCE': pacpAdminData.nonce
                }
            }).then(res => {
                queryClient.invalidateQueries(["notifications", "all"]);
                queryClient.invalidateQueries(["notifications", props.searchQuery]);
                return res; // Return the result to resolve the promise
            }).catch(error => {
                throw error; // Reject the promise with the error
            });
        }
    });

    const handleDeleteAction = useMutation({
        mutationFn: id => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`
            return axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-NONCE': pacpAdminData.nonce
                },
                data: {}
            }).then(res => {
                queryClient.invalidateQueries(["notifications", "all"])
                queryClient.invalidateQueries(["notifications", props.searchQuery])
                return res;
            }).catch(error => {
                throw error
            })
        }
    })

    const handleBulkDeleteAction = useMutation({
        mutationFn: selectedNotifications => {
            const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications`
            axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-NONCE': pacpAdminData.nonce
                },
                data: { ids: selectedNotifications }
            }).then(res => {
                queryClient.invalidateQueries(["notifications", "all"])
                queryClient.invalidateQueries(["notifications", props.searchQuery])
            })
        }
    })

    const { itemsPerPage, currentPage } = paginationSettings;
    const itemsToDisplay = [...items].slice(
        (currentPage - 1) * itemsPerPage,
        itemsPerPage * currentPage
    );

    const handleCopyMessage = (id) => {
        toast.promise(
            handleCopyAction.mutateAsync(id), // Use mutateAsync to get the promise
            {
                loading: __('Copying notification...', 'pop-and-convert'),
                success: __('Notification has been copied', 'pop-and-convert'),
                error: __('Failed to copy notification', 'pop-and-convert')
            }
        );
    }

    const handleDeleteMessage = (id) => {
        toast.promise(
            handleDeleteAction.mutateAsync(id),
            {
                loading: __('Deleteing Notification...', 'pop-and-convert'),
                success: __(`Notification Deleted!.`, 'pop-and-convert'),
                error: __('Failed to delete notification', 'pop-and-convert')
            }
        );
        setDialogOpen(false)
    }

    const handleStatusMessage = (id) => {
        let changeStatusData = { ...items.find(({ id: _id }) => id === _id) };
        let statusInfo = changeStatusData.status === 'active' ? 'inactive' : 'active';
        toast.promise(
            handleStatusChangeAction.mutateAsync(id),
            {
                loading: __('Changing status...', 'pop-and-convert'),
                success: __(`Notification is now ${statusInfo}.`, 'pop-and-convert'),
                error: __('Failed to change status', 'pop-and-convert')
            }
        );
    }

    function handleBulkAction() {
        if (bulkAction === "delete") {
            setBulkDialogOpen(true);
        }
    }

    function handleBulkDeleteMessage() {
        toast.promise(
            handleBulkDeleteAction.mutateAsync(selectedNotifications),
            {
                loading: __('Deleteing Notification...', 'pop-and-convert'),
                success: __(`Notification Deleted!.`, 'pop-and-convert'),
                error: __('Failed to delete notification', 'pop-and-convert')
            }
        );
        setBulkDialogOpen(false)
    }

    function closeModal() {
        setDialogOpen(false)
        setBulkDialogOpen(false)
    }

    return (
        <div className="w-full overflow-auto">
            <table className="shadow-[0_4px_4px_0_rgba(0,18,64,0.04)] bg-white w-full">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="py-4 px-6 bg-primary-accent-2 text-left  border-b"
                        >
                            <input
                                type="checkbox"
                                checked={items.length !== 0 && selectedNotifications.length === items.length}
                                onChange={() => {
                                    if (selectedNotifications.length === items.length) {
                                        setSelectedNotifications([]);
                                    } else {
                                        setSelectedNotifications(items.map(({ id }) => id));
                                    }
                                }}
                            />
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-left border-b">
                            {__('Notification Title', 'pop-and-convert')}
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-center border-b whitespace-nowrap">
                            {__('Notification Type', 'pop-and-convert')}
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-center border-b">
                            <div className="flex items-center justify-center gap-1">

                                {
                                    pacpAdminData.pro_activated ?
                                        <>
                                            {__('Views ', 'pop-and-convert')}
                                            <Tooltip content={'Total Views'} direction="left">
                                                <Icon icon={'help'} />
                                            </Tooltip>
                                        </>
                                        :
                                        <Tooltip content={'This feature is exclusive to our Premium Plan. To access this and other advanced features.'} direction="left" linkText="Upgrade to Pro" link="www.google.com" delay={400} className='py-4'>
                                            <span className="blur-[2px] hover:cursor-default">{__('Views', 'pop-and-convert')}</span>
                                        </Tooltip>
                                }

                            </div>
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-center  border-b">
                            <div className="flex items-center justify-center gap-1">
                                {
                                    pacpAdminData.pro_activated ?
                                        <>
                                            {__('Clicks ', 'pop-and-convert')}
                                            <Tooltip content={'Total Clicks'} direction="left">
                                                <Icon icon={'help'} />
                                            </Tooltip>
                                        </>
                                        :
                                        <Tooltip content={'This feature is exclusive to our Premium Plan. To access this and other advanced features.'} direction="left" linkText="Upgrade to Pro" link="www.google.com" delay={400} className='py-4'>
                                            <span className="blur-[2px] hover:cursor-default">{__('Clicks', 'pop-and-convert')}</span>
                                        </Tooltip>
                                }
                            </div>
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-center  border-b">
                            {__('Status', 'pop-and-convert')}
                        </th>
                        <th scope="col" className="py-4 px-6 bg-primary-accent-2 text-center  border-b">
                            {__('Action', 'pop-and-convert')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {itemsToDisplay.map((notification) => {
                        const { id, title, type, status } = notification;

                        const statsData = notificationStats?.find(({ id: _id }) => id === _id)
                        const views = statsData !== undefined ? statsData.views : 0; //get clicks analytics
                        const clicks = statsData !== undefined ? statsData.clicks : 0; //get clicks analytics

                        return (
                            <tr key={id}>
                                <td scope="row" className="py-4 px-6 text-left border-b">
                                    {props.loading ? <Skeleton className='h-4 w-4' /> : <input
                                        type="checkbox"
                                        checked={selectedNotifications.includes(id)}
                                        onChange={() => {
                                            setSelectedNotifications(
                                                selectedNotifications.includes(id)
                                                    ? selectedNotifications.filter((_id) => _id !== id)
                                                    : [...selectedNotifications, id]
                                            );
                                        }}
                                        name="checkbox"
                                        id="checkbox"
                                    />}

                                </td>
                                <td className="py-4 px-6 text-left border-b">
                                    {props.loading ? <Skeleton className='w-full h-8' /> :
                                        <span className="max-w-[350px] truncate text-[14px] inline-block hover:cursor-pointer hover:text-primary-color">
                                            <Link to={`/notifications/${id}/edit`}>
                                                {title}
                                            </Link>
                                        </span>
                                    }
                                </td>
                                <td className="py-4 px-6 text-center border-b">{props.loading ? <Skeleton className='w-12 h-8' /> : <span className={`py-1 px-2 rounded-2xl text-xs capitalize inline-block max-w-[200px] ${type === 'sticky' && 'bg-[#bcf1ca]'} ${type === 'popup' && 'bg-[#ffbe6b]'}`}>
                                    {type === 'popup' ? __('Overlay', 'pop-and-convert') : __('Sticky', 'pop-and-convert')}</span>}
                                </td>
                                <td className="py-4 px-6 text-[14px] text-center border-b">
                                    {props.loading
                                        ? <Skeleton className='max-w-[60px] h-8 w-full' />
                                        :
                                        pacpAdminData.pro_activated
                                            ? views
                                            :
                                            <span className="blur-[2px] hover:cursor-default px-3">{__('0', 'pop-and-convert')}</span>
                                    }
                                </td>
                                <td className="py-4 px-6 text-[14px] text-center border-b">
                                    {props.loading
                                        ? <Skeleton className='max-w-[60px] h-8 w-full' />
                                        :
                                        pacpAdminData.pro_activated
                                            ? clicks
                                            :
                                            <span className="blur-[2px] hover:cursor-default px-3">{__('0', 'pop-and-convert')}</span>
                                    }
                                </td>
                                <td className="py-4 px-6 text-center border-b"> {props.loading ? <Skeleton className='h-5 w-9' /> :
                                    <Toggle
                                        type="checkbox"
                                        checked={"active" === status}
                                        onChange={() => handleStatusMessage(id)}
                                        id="checkbox"
                                    />}
                                </td>
                                <td className="py-4 px-6 text-center border-b ">
                                    {props.loading ? <Skeleton className='h-8 max-w-[80px] w-full' /> :
                                        <div className="action-icon flex items-center justify-center gap-1">
                                            <Link to={`/notifications/${id}/edit`} className="hover:text-primary-color hover:bg-primary-accent rounded transition-colors">
                                                <Icon icon="pen" />
                                            </Link>
                                            <a className="copy hover:text-primary-color hover:bg-primary-accent rounded p-[10px] transition-colors" id="copy" onClick={() => handleCopyMessage(id)}>
                                                <Icon icon="copy" />
                                            </a>
                                            <a className="delete hover:text-primary-color hover:bg-primary-accent rounded transition-colors" id="delete" onClick={() => {
                                                setDeleteId(id)
                                                setDialogOpen(true)
                                            }}>
                                                <Icon icon="trash-can" />
                                            </a>
                                        </div>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7} className="px-6 py-3">
                            <TablePagination
                                perPage={itemsPerPage}
                                currentPage={currentPage}
                                total={items.length}
                                onPageChange={(currentPage) => {
                                    setPaginationSettings({
                                        ...paginationSettings,
                                        currentPage,
                                    });
                                }}
                                onItemsPerPageChange={(itemsPerPage) => {
                                    setPaginationSettings((prevSetting) => {
                                        return {
                                            ...prevSetting,
                                            itemsPerPage: itemsPerPage
                                        }
                                    })
                                }}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
            {
                selectedNotifications.length > 1 &&
                <div className="flex gap-4 mt-4 mb-4">
                    <div className="dropdown-menu max-w-[175px]">
                        <select name="bulk_action" id="bulk_action" className="list" onChange={handleBulkChange} value={bulkAction}>
                            <option value="bulk-action">{__('Bulk Action', 'pop-and-convert')}</option>
                            <option value="delete">{__('Delete Selected', 'pop-and-convert')}</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={handleBulkAction}>{__('Apply Changes', 'pop-and-convert')}</button>
                </div>
            }
            <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen} type="modal" className='max-w-[450px] w-full rounded-2xl'>
                <ConfirmDialog 
                    callback={handleDeleteMessage}
                    close={closeModal}
                    notification={deleteId}
                />
            </Dialog>
            <Dialog onClose={() => setBulkDialogOpen(false)} open={bulkDialogOpen} type="modal" className='max-w-[450px] w-full rounded-2xl'>
                <ConfirmDialog 
                    callback={handleBulkDeleteMessage}
                    close={closeModal}
                />
            </Dialog>
        </div>
    );
}
