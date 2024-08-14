import React, { useState } from 'react';
import { useUpdateUser } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const EditUserForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [dealership, setDealership] = useState(user.dealership);

  const updateUser = useUpdateUser();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser.mutateAsync({ id: user.id, name, email, role, dealership });
      toast({ title: "User updated successfully" });
    } catch (error) {
      toast({ title: "Error updating user", description: error.message, variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Select name="role" onValueChange={(value) => setRole(value)} value={role}>
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="advisor">Advisor</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="dealership"
        placeholder="Dealership"
        value={dealership}
        onChange={(e) => setDealership(e.target.value)}
        required
      />
      <Button type="submit">Update User</Button>
    </form>
  );
};

export default EditUserForm;